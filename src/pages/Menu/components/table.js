import React,{useState,useContext} from 'react';
import {
    Grid,
    TextField,
    Button,
    Typography,
    Switch 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useMaindishContext} from './../../../context/maindishesContext';
export const Tablelist = () =>{
    const useStyles1 = makeStyles((theme) => ({
        root: {
            padding: theme.spacing(1),
        },
    }));
    const {maindish,maindishAction} = useMaindishContext();
    const onChangeValue = (e) =>{
        const {name,value} = e.target;
        maindishAction.addState(name,value)
    };
    const onUploadFile = (e) =>{
        console.log(e.target.files);
        maindishAction.addState('image_url',e.target.files[0])
    };
    const classes1 = useStyles1();
    return(
        <Grid container >
            <Grid item  md={12} className={classes1.root}>
                <TextField fullWidth name='name' variant="outlined" id="menu-name" label="ชื่อเมนู" value={maindish.name} onChange={onChangeValue}/>
            </Grid>
            <Grid item  md={12} className={classes1.root}>
                <TextField fullWidth name='desc' variant="outlined" id="menu-description" label="คำอธิบายเมนู" value={maindish.desc} onChange={onChangeValue}/>
            </Grid>   
            <Grid item  md={6} className={classes1.root}>
                <TextField fullWidth name='price' variant="outlined" id="menu-price" label="ราคา" value={maindish.price} onChange={onChangeValue}/>
            </Grid>
            <Grid item  md={12} className={classes1.root}>
                <div>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        {'Upload File'}
                        <input
                            type="file"
                            onChange={onUploadFile}
                            hidden
                        />
                    </Button>                      
                    <Typography display={'inline'} style={{marginLeft:'10px'}}>
                        {maindish.image_url.name}
                    </Typography>                      
                </div>
                            
          
            </Grid>
        </Grid>                   

    );
}