import React, { useState, useEffect, useContext } from 'react'

import moment from 'moment'

import { Redirect } from 'react-router-dom'
import firebase from '../../firebase/config'
import { Auth } from '../../context/authContext'
import {
    Button,
    Container,
    TextField,
    Box,
    CircularProgress,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import { HeaderLogin } from '../../containers/index'

import { AlertDialog } from '../../components/Alert'

const useStyles = makeStyles((theme) =>  console.log('theme:',theme) || ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
        '& .MuiContainer-root': {
            padding: '0px',
        },
        marginTop:theme.spacing(14),
    },
    login:{
        backgroundColor: '#5daf3f',
        color:'#f0ffe8',
        margin: theme.spacing(1),
    },
    paper: {    
        justifyContent: 'center',
        [theme.breakpoints.up('lg')]: {
            display: "flex",
        },
        height:'100%',
        width: '70%',
        boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.2)',
    },
    box: {
        padding:theme.spacing(3),
    },
    font:{
        fontFamily: 'Pattaya, sans-serif',
        fontSize:'75px',
        color:'#f0ffe8',
    },
    backgrounds:{
        textAlign: 'center',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            height:'300px',
            width: '100%',
        },
        [theme.breakpoints.down('md')]: {
            height:'100px',
            width: '100%',
        },
        background: 'rgb(34,193,195) linear-gradient(239deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)'
    }
}))

const Login = (props) => {
    const classes = useStyles()

    const [routeRedirect, setRouteRedirect] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [userType, setUserType] = useState('')
    const [error, setError] = useState(null)

    const { state, dispatch } = useContext(Auth)
    const initialAlert = {
        open: false,
        text: 'token ไม่ถูกต้องหรือหมดอายุ กรุณาสแกน QR CODE ใหม่อีกครั้ง',
        colorNotify: 'error',
    }
    const [alert, setalert] = useState(initialAlert)

    const token = props.match.params.token
    const tableNumber = props.match.params.table_number
    const branchId = props.match.params.branch_id

    useEffect(() => {
        if (token) {
            loginWithToken()
        }
    }, [])

    const loginWithToken = async () => {
        setIsLoading(true)
        await firebase
            .loginWithToken(token)
            .then((response) => {
                console.log('Login user:', response.user)
                const user = response.user
                const customer = {
                    uid: user.uid,
                    branchstore: user.branchstore,
                    type: 'customer',
                    table_number: tableNumber,
                    created_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
                    updated_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
                }
                console.log('customer', customer)
                firebase
                    .addCustomer(customer)
                    .then(() => {
                        firebase
                            .updateCustomerTable(branchId,tableNumber, user.uid)
                            .then(() => {
                                firebase
                                    .addCustomerToRestaurant(branchId,customer.uid)
                                    .then(() => {
                                        const customerInfo = {
                                            uid: user.uid,
                                            branchstore: branchId,
                                            type: 'customer',
                                            table_number: tableNumber,
                                            email: null,
                                            refreshToken: user.refreshToken,
                                        }
                                        localStorage.setItem(
                                            'user',
                                            JSON.stringify(customerInfo)
                                        )
                                        setIsLoading(false)
                                        setUserType('customer')
                                        setRouteRedirect(true)
                                        return dispatch({
                                            type: 'LOGIN',
                                            payload: customerInfo,
                                        })
                                    })
                                    .catch((error) =>
                                        console.log(
                                            'addCustomerToRestaurant',
                                            error.message
                                        )
                                    )
                            })
                            .catch((error) => {
                                setIsLoading(false)
                                console.log(
                                    '[updateCustomerTable] error',
                                    error.message
                                )
                            })
                    })
                    .catch((error) => {
                        setIsLoading(false)
                        console.log('[addCustomer] error', error.message)
                    })
            })
            .catch((error) => {
                setIsLoading(false)
                console.log('[loginWithToken] error', error.message)
                setalert({ ...initialAlert, open: true })
                setError(error.message)
            })
    }

    const handleSubmit = async (e) => {
        const email = document.getElementById('input-email').value
        const password = document.getElementById('input-password').value
        e.preventDefault()
        // const { email, password } = formValues
        setIsLoading(true)
        let response = await firebase.login(email, password)
        if (response.hasOwnProperty('message')) {
            console.log(response.message)
            setIsLoading(false)
        } else {
            console.log('Login user:', response.user)
            firebase
                .getUserInfo(response.user.uid)
                .then((doc) => {
                    if (doc.exists) {
                        console.log('getUserInfo:', doc.data())

                        const userInfo = {
                            uid: response.user.uid,
                            type: doc.data().type,
                            branchstore: doc.data().branchstore,
                            email: response.user.email,
                            refreshToken: response.user.refreshToken,
                        }
                        localStorage.setItem('user', JSON.stringify(userInfo))

                        setIsLoading(false)
                        setUserType(doc.data().type)
                        setRouteRedirect(true)
                        return dispatch({
                            type: 'LOGIN',
                            payload: userInfo,
                        })
                    } else {
                        console.log('Not found user!')
                        setIsLoading(false)
                    }
                })
                .catch(function (error) {
                    console.log('[Login] error: ', error.message)
                    setIsLoading(false)
                })
        }
    }

    const redirect = routeRedirect
    if (redirect) {
        console.log('redirect [user]', state.user)
        if (userType === 'staff') {
            return <Redirect to="/orders" />
        } else if (userType === 'manager') {
            return <Redirect to="/dashboard" />
        } else {
            return <Redirect to="/customer" />
        }
    }

    let button = (
        <Button variant="contained" fullWidth onClick={handleSubmit} className={classes.login}>
            Sign In
        </Button>
    )

    if (isLoading) {
        button = <CircularProgress />
    }

    return (
                <React.Fragment>
                    <AlertDialog
                        alert={alert}
                        onClose={() => setalert({ ...alert, open: false })}
                    />
                    <Container className={classes.root}>
                        <Container  className={classes.paper}>
                            <div className={classes.backgrounds}>
                                <p className={classes.font}>{'Ez Restaurant'}</p>
                            </div>
                            <div className={classes.box}>
                                <HeaderLogin background="gray" />
                                <TextField
                                    id="input-email"
                                    variant="outlined"
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    placeholder="Email"
                                />
                                <TextField
                                    id="input-password"
                                    variant="outlined"
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    placeholder="Password"
                                />
                                {button}
                            </div>
                        </Container>
                    </Container>
                </React.Fragment>
    )
}

export default Login
