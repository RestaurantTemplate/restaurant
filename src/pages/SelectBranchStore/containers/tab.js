/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import {Container,Paper,Box,CircularProgress } from '@material-ui/core';
import {getAllBranchStore} from '../../../firebase/branchstoreFirebase';
import {BranchStore} from './branchStore'
export const Tabmenu = () =>{
    const [branchstore,setbranchstore] = useState([]);
    const [loading,setloading] = useState(true)
    useEffect(() => {
        setloading(true)
        getAllBranchStore().onSnapshot(function(querySnapshot) {
            var cities = [];
            querySnapshot.forEach(function(doc) {
                cities.push({id:doc.id,value:doc.data()});
            });
            console.log('Current BranchStore :',cities)
            setbranchstore(cities)
            setloading(false)
        },function (error) {
            console.log('BranchStore Error:', error.message)
            setloading(false)
        });
    }, [])
    const ShowData = () =>(
        loading === false ?
            branchstore.map((doc)=>{
                return <BranchStore  doc={doc}/>
            })
            :<CircularProgress />    
    )
    return(
        <Box display={{ xs: 'block', md: 'block' }}>
            <Container maxWidth={'md'}>
                <Paper style={{padding:'5%'}} elevation={4} >
                {
                    <ShowData />
                }
                </Paper>
            </Container>
        </Box>
    );
}