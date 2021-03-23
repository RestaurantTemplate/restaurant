/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState} from 'react'
import { TabContext,TabList,TabPanel } from '@material-ui/lab';
import {AppBar,Tab,Container,Paper,Box } from '@material-ui/core';
import {Menu} from '../components';
import {Dialoglist} from './dialog';
import {useStyles} from '../../../css/css';
export const Tabmenu = (props) =>{
    const {menu,setmenu} = props
    const classes = useStyles();
    const [restaurants,setrestaurants] = useState([]);
    const [open,setopen] = useState(false);
    return(
        <Box display={{ xs: 'block', md: 'block' }}>
            <Dialoglist open={open} setopen={setopen} list={restaurants} setlist={setrestaurants}/>
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