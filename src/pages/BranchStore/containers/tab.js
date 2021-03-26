/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState} from 'react'
import {Container,Paper,Box } from '@material-ui/core';
import {Menu} from '../components';
import {Dialoglist} from './dialog';
import {useStyles} from '../../../css/css';
import {Snackbar} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
export const Tabmenu = (props) =>{
    const {menu,setmenu} = props
    const classes = useStyles();
    const [restaurants,setrestaurants] = useState([]);
    const [open,setopen] = useState(false);
    return(
        <Box display={{ xs: 'block', md: 'block' }}>
            {/* <Snackbar
                anchorOrigin={{ vertical: 'top',horizontal: 'center'}}
                open={!open}
                onClose={onClose}          
            >
                 <Alert onClose={onClose} severity="success">
                    เพิ่มสาขาสำเร็จ
                </Alert>
            </Snackbar> */}
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