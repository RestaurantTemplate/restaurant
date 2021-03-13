import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import {
    Grid,
    Fab,
    Box
} from '@material-ui/core';
const useStyleslocal = makeStyles((theme) => ({
    Font: {
        [theme.breakpoints.up('xs')]: {
            fontSize:"8px"
        },
        [theme.breakpoints.up('sm')]: {
            fontSize:"15px"
        },
    },
    icons: {
        [theme.breakpoints.down('sm')]: {
            width:"20px",
            height:"20px"
        },

    },
    textStyle: {
        [theme.breakpoints.down('sm')]: {
            height:"20px",
            fontSize:"10px",
        },
    },
    textNopadding: {
        paddingLeft:"1px",
        paddingRight:"1px",
    },
    buttonStyle: {
        [theme.breakpoints.down('xs')]: {
            height:"20px",
            width:"20px",
            maxheight:"20px",
            maxwidth:"20px",
        },
    },
}));
export const Menu = (props) =>{
    const {menu,setmenu,setopen} = props;
    return(
        <>
            <Grid container alignItems="center" >
                <Grid container justify="right" alignItems="right" xs={2}>
                    <Box component='div'>
                        <Fab  component="button" justify="center" alignItems="center" size={'small'}  color="primary" aria-label="add" onClick={() => setopen(true)}>
                            <AddIcon />
                        </Fab>
                    </Box>
                </Grid>
            </Grid>
        </>
    );

}