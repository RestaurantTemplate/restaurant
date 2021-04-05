/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect,useContext} from 'react'
import {Container,Paper,Box,CircularProgress } from '@material-ui/core';
import {getAllTable} from '../../../firebase/tableFirebase';
import {Auth} from './../../../context/authContext';
import {AddTable} from '../components';
import {Dialoglist} from './dialog';
import {AlertDialog} from '../../../components';
import {Table} from './table'
export const Tabmenu = () =>{
    const [table,settable] = useState([]);
    const [open,setopen] = useState(false);
    const {state} = useContext(Auth);
    const initialAlert = {
        open:false,
        text:'',
        colorNotify:''
    }
    const [alert,setalert] = useState(initialAlert);
    const [loading,setloading] = useState(true)
    useEffect(() => {
        setloading(true)
        getAllTable(state.user.branchstore).orderBy("table_number", "asc").onSnapshot(function(querySnapshot) {
            var cities = [];
            console.log('Current Tables :',querySnapshot)
            querySnapshot.forEach(function(doc) {
                cities.push({id:doc.id,value:doc.data()});
            });
            console.log('Current Tables :',cities)
            settable(cities)
            setloading(false)
        },function (error) {
            console.log('Tables Error:', error.message)
            setloading(false)
        });
    }, [])
    const ShowData = () =>(
        loading === false ?
            table.map((doc)=>{
                return <Table  doc={doc} setalert={setalert}/>
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
                        <AddTable setopen={setopen}/>
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