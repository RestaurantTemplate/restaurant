import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../firebase/config'
import { Auth } from '../../context/authContext'
import { Button, Container, TextField, Paper } from '@material-ui/core'
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

    const [formValues, setFormValues] = useState({ email: '', password: '' })
    const [routeRedirect, setRouteRedirect] = useState(false)

    const { state, dispatch } = React.useContext(Auth)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = formValues
        let response = await firebase.login(email, password)
        if (response.hasOwnProperty('message')) {
            console.log(response.message)
        } else {
            console.log("user",response.user);
            setRouteRedirect(true)
            return dispatch({
                type: 'LOGIN',
                payload: response.user,
            })
        }
    }

    const redirect = routeRedirect
    if (redirect) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Container>
            <Paper elevation={5} className={classes.paper}>
                <form
                    onSubmit={handleSubmit}
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Email"
                            type="email"
                            placeholder="Email"
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    email: e.target.value,
                                })
                            }
                            value={formValues.email}
                        />
                    </div>
                    <div>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Password"
                            type="password"
                            placeholder="Password"
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    password: e.target.value,
                                })
                            }
                            value={formValues.password}
                        />
                    </div>
                    <Button variant="contained" type="submit">
                        Login
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default Login
