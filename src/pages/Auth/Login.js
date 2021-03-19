import React, { useState } from 'react'
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

const Login = () => {
    const classes = useStyles()

    // const [formValues, setFormValues] = useState({ email: '', password: '' })
    const [routeRedirect, setRouteRedirect] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [userType, setUserType] = useState('')

    const { state, dispatch } = React.useContext(Auth)

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
            firebase.getUserInfo(response.user.uid).then((doc) => {
                if (doc.exists) {
                    console.log('getUserInfo:', doc.data())

                    const userInfo = {
                        uid: response.user.uid,
                        type: doc.data().type,
                        email: response.user.email,
                        displayName: response.user.displayName,
                        refreshToken: response.user.refreshToken,
                    }
                    localStorage.setItem('user',JSON.stringify(userInfo))  

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
            }).catch(function(error) {
                console.log("[Login] error: ", error.message)
                setIsLoading(false)
            })
        }
    }

    const redirect = routeRedirect
    if (redirect) {
        console.log('redirect [user]', state.user)
        if (userType === 'staff') {
            return <Redirect to="/orders" />
        }
        else if (userType === 'manager') {
            return <Redirect to="/dashboard" />
        }
    }

    let button = (
        <Button variant="contained" type="submit">
            Login
        </Button>
    )

    if (isLoading) {
        button = <CircularProgress/>
    }

    return (
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
                            id='input-email' 
                            variant="outlined"
                            fullWidth
                            label="Email"
                            type="email"
                            placeholder="Email"
                            // onChange={(e) =>
                            //     setFormValues({
                            //         ...formValues,
                            //         email: e.target.value,
                            //     })
                            // }
                            // value={formValues.email}
                        />
                    </div>
                    <div>
                        <TextField
                            id='input-password' 
                            variant="outlined"
                            fullWidth
                            label="Password"
                            type="password"
                            placeholder="Password"
                            // onChange={(e) =>
                            //     setFormValues({
                            //         ...formValues,
                            //         password: e.target.value,
                            //     })
                            // }
                            // value={formValues.password}
                        />
                    </div>
                    {button}
                </form>
            </Paper>
        </Container>
    )
}

export default Login
