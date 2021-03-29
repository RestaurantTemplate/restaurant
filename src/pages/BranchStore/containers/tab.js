/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState} from 'react'
import {Container,Paper,Box } from '@material-ui/core';
import {Menu} from '../components';
import {Dialoglist} from './dialog';
import {AlertDialog} from './../../../components';
import {useStyles} from '../../../css/css';
export const Tabmenu = (props) =>{
    const {menu,setmenu} = props
    const classes = useStyles();
    const [restaurants,setrestaurants] = useState([]);
    const [open,setopen] = useState(false);
    const initialAlert = {
        open:false,
        text:'',
        colorNotify:''
    }
    const [alert,setalert] = useState(initialAlert);
    return(
        <Box display={{ xs: 'block', md: 'block' }}>
            <AlertDialog alert={alert} onClose={() => setalert({...alert,open:false})} />
            <Dialoglist open={open} setopen={setopen} setalert={setalert}/>
            <Container className={classes._root} maxWidth={'md'}>
                <Paper className={classes._root_paper} style={{padding:'5%'}} elevation={4} >
                {
                    <>
                        <Menu menu={menu} setmenu={setmenu} setopen={setopen}/>
                    </>
                }
                </Paper>
            </Container>
        </Box>
    );
}