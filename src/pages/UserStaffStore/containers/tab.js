/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import {Container,Paper,Box,CircularProgress } from '@material-ui/core';
import {registerWithEmailAndPassword} from './../../../firebase/userFirebase';
import {AddUserStaffStore} from './../components';
import {Dialoglist} from './dialog';
import {AlertDialog} from './../../../components';
import {UserStaffStore} from './userStaffStore'
export const Tabmenu = () =>{
    const [branchstore,setbranchstore] = useState([]);
    const [open,setopen] = useState(false);
    const initialAlert = {
        open:false,
        text:'',
        colorNotify:''
    }
    const [alert,setalert] = useState(initialAlert);
    const [loading,setloading] = useState(true)
    useEffect(() => {
        setloading(true)
        registerWithEmailAndPassword('sdafsadf','sdfadsfsadfa')
        setloading(false)
    }, [])
    const ShowData = () =>(
        loading === false ?
            branchstore.map((doc)=>{
                return <UserStaffStore  doc={doc} setalert={setalert}/>
            })
            :<CircularProgress />    
    )
    return(
        <Box display={{ xs: 'block', md: 'block' }}>
            <AlertDialog alert={alert} onClose={() => setalert({...alert,open:false})} />
            <Dialoglist  open={open} setopen={setopen} setalert={setalert}/>
            <Container maxWidth={'md'}>
                <Paper style={{padding:'5%'}} elevation={4} >
                {
                    <>
                        <AddUserStaffStore setopen={setopen}/>
                        <br/><br/>
                    </>
                }
                {
                    <ShowData />
                }
                </Paper>
            </Container>
        </Box>
    );
}