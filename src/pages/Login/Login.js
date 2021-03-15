import React, { useState } from 'react'
import { Button, Container, TextField, Paper ,FormControl } from '@material-ui/core'
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
        <Container className={classes.paper}>
            <Paper elevation={5} className={classes.paper}>
                <Container maxWidth={'xs'} className={classes.paper}>
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
                </Container>
                <Container maxWidth={'xs'} className={classes.paper}>
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
                </Container>
                <Container maxWidth={'xs'} >
                    <Button fullWidth variant="containedPrimary" size={'medium'}   type="submit" onClick={handleSubmit}>
                        Login
                    </Button>                    
                </Container>

            </Paper>
        </Container>
    )
}

export default withFirebase(Login)
