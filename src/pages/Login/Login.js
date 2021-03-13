import React, { useState } from 'react'
import { Button, Container, TextField, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { withFirebase } from '../../firebase'

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

    const [formValues, setFormValues] = useState({ email: '', password: '' })
    const [errMessage, setErrMessage] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()

        const { email, password } = formValues
        props.firebase
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("email:" + email)
                console.log("password:" + password)
                setFormValues({ email: '', password: '' })
                // props.history.push('/')
            })
            .catch((err) => setErrMessage(err.message))
    }

    return (
        <Container>
            <Paper elevation={5} className={classes.paper}>
                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
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

export default withFirebase(Login)
