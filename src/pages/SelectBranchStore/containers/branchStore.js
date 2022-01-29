import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Card,Box,Fab} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import { Redirect } from 'react-router-dom'
import { Auth } from '../../../context/authContext';
import Firebase from './../../../firebase/config';
const useStyles = makeStyles({
    root: {
        padding: '10px',
        marginBottom: '20px',
    },
    description: {
        padding: '5px',
        minHeight: '60px',
        border: '1px solid rgba(0, 0, 0, 0.7)',
        boxSizing: 'border-box',
        borderRadius: '7px',
    },
    accept: {
        color: 'green',
    },
    cancel: {
        color: 'red',
    },
})

export function BranchStore(props) {
    const classes = useStyles()
    const {doc} = props;
    const { dispatch } = useContext(Auth)
    const setLocalStorage = async() =>{
        let user = JSON.parse(localStorage.getItem('user'));
        console.log('[localStorage]:',user);
        user['branchstore'] = doc.id;
        return await Firebase.getBranchName(doc.id).then((docs)=>{
            user['name'] = docs.name;
            localStorage.setItem('user',JSON.stringify(user));
            dispatch({
                type: 'LOGIN',
                payload: user,
            })
            return <Redirect to="/dashboard" />
        })
    }
    return (
        <Card className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={9} sm={10} md={11}>
                    <Typography>สาขาชื่อ <b>{doc.value.name}</b></Typography>
                </Grid>
                <Grid item xs={3} sm={2} md={1}>
                    <Box component='div'>
                        <Fab  component="button"  justify="center" alignItems="center" size={'small'}  color="primary" aria-label="add" onClick={setLocalStorage}>
                            <SendIcon />
                        </Fab>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}
