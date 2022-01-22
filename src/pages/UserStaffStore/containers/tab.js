/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect,useContext} from 'react'
import {Container,Paper,Box,CircularProgress } from '@material-ui/core';
import {getUser} from './../../../firebase/userFirebase';
import {AddUserStaffStore} from './../components';
import {Dialoglist} from './dialog';
import {AlertDialog} from './../../../components';
import {UserStaffStore} from './userStaffStore'
import { Auth } from './../../../context/authContext'
export const Tabmenu = () =>{
    const [user,setuser] = useState([]);
    const [open,setopen] = useState(false);
    const [check,setcheck] = useState(false);
    const { state, dispatch } = useContext(Auth)
    const initialAlert = {
        open:false,
        text:'',
        colorNotify:''
    }
    const [alert,setalert] = useState(initialAlert);
    const [loading,setloading] = useState(true)
    const getDefault = async() =>{
        setloading(true);
        const userAll = await getUser({branchid:state.user.branchstore});
        await setuser(userAll.data);
        setloading(false);
    }
    useEffect(() => {
        getDefault();
    }, [check])
    const ShowData = () =>(
        loading === false ?
            user.map((doc)=>{
                return <UserStaffStore check={check} setcheck={setcheck}  doc={doc} setalert={setalert}/>
            })
            :<CircularProgress />    
    )
    return(
        <Box display={{ xs: 'block', md: 'block' }}>
            <AlertDialog alert={alert} onClose={() => setalert({...alert,open:false})} />
            <Dialoglist  open={open} setopen={setopen} setalert={setalert} check={check} setcheck={setcheck}/>
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