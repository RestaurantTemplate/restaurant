import React,{useState} from 'react';
import {
    Grid,
    TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
export const Tablelist = (props) =>{
    const {item,setitem} = props;
    const useStyles1 = makeStyles((theme) => ({
        root: {
            padding: theme.spacing(1),
        },
    }));
    const onChangeValue = (e) =>{
        const {name,value} = e.target;
        setitem({...item,[name]:value});
    };
    const classes1 = useStyles1();
    return(
        <Grid container >
            <Grid  md={12} className={classes1.root}>
                <TextField fullWidth name='username' variant="outlined" id="menu-username" label="User Name" value={item.username} onChange={onChangeValue}/>
            </Grid>
            <Grid  md={12} className={classes1.root}>
                <TextField fullWidth name='password' variant="outlined" id="menu-password" label="Password" value={item.password} onChange={onChangeValue}/>
            </Grid>
        </Grid>                   

    );
}