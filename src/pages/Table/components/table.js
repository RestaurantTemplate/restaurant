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
    const onIntChangeValue = (e) =>{
        const {name,value} = e.target;
        setitem({...item,[name]:!isNaN(parseInt(value))? parseInt(value) : ''});
    };
    const classes1 = useStyles1();
    return(
        <Grid container >
            <Grid item xs={12} md={6} className={classes1.root}>
                <TextField fullWidth name='name' variant="outlined" id="menu-name" label="ชื่อโต๊ะ" value={item.name} onChange={onChangeValue}/>
            </Grid>
            <Grid item xs={12} md={6} className={classes1.root}>
                <TextField inputProps={{ maxLength: 2}} fullWidth name='table_number' variant="outlined" id="menu-table_number" label="เลขโต๊ะ" value={item.table_number} onChange={onIntChangeValue}/>
            </Grid>
        </Grid>                   

    );
}