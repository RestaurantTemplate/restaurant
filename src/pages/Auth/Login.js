import React, { useState, useEffect, useContext } from 'react'

import moment from 'moment'

import { Redirect } from 'react-router-dom'
import firebase from '../../firebase/config'
import { Auth } from '../../context/authContext'
import {
    Button,
    Container,
    TextField,
    Paper,
    CircularProgress,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import { HeaderLogin } from '../../containers/index'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    paper: {
        padding: '20px',
    },
}))

const Login = (props) => {
    const classes = useStyles()

    const [routeRedirect, setRouteRedirect] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [userType, setUserType] = useState('')
    const [error, setError] = useState(null)

    const { state, dispatch } = useContext(Auth)

    const token = props.match.params.token

    // const {
    //     match: { params },
    // } = props

    // console.log('[Login Page] query params: ', params.token)

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
                setIsLoading(false)
                console.log('Login user:', response.user)
                const user = response.user
                const customer = {
                    uid: user.uid,
                    type: 'customer',
                    table_number: 3,
                    created_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
                    updated_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
                }
                firebase
                    .addCustomer(customer)
                    .then((response) => {
                        console.log(response)
                        const customerInfo = {
                            uid: user.uid,
                            branchstore: user.branchstore,
                            type: 'customer',
                            table_number: 3,
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
                    .catch((error) => {
                        setIsLoading(false)
                        console.log('[addCustomer] error', error.message)
                    })
            })
            .catch((error) => {
                setIsLoading(false)
                console.log('[loginWithToken] error', error.message)
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
        <Button variant="contained" type="submit">
            Login
        </Button>
    )

    if (isLoading) {
        button = <CircularProgress />
    }

    return (
        <React.Fragment>
            <HeaderLogin background="gray" />
            <Container className={classes.paper}>
                <Paper elevation={5} className={classes.paper}>
                    <form
                        onSubmit={handleSubmit}
                        className={classes.root}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="input-email"
                                variant="outlined"
                                fullWidth
                                label="Email"
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <TextField
                                id="input-password"
                                variant="outlined"
                                fullWidth
                                label="Password"
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        {button}
                    </form>
                </Paper>
            </Container>
        </React.Fragment>
    )
}

export default Login
