/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useContext,useMemo} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Grid,Card,Box,Fab} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit';
import {AlertDialog} from '../../../components';
import {removeTable} from '../../../firebase/tableFirebase';
import firebase from '../../../firebase/config'
import {DialoglistEdit} from './dialog';
import {Auth} from '../../../context/authContext';
import QRCode from 'qrcode.react';
const useStyles = makeStyles({
    root: {
        padding: '10px',
        marginBottom: '20px',
    },
    description: {
        padding: '5px',
        minHeight: '60px',
        border: '1px solid rgba(0, 0, 0, 0.7)',
        boxSizing: 'border-box',
        borderRadius: '7px',
    },
    accept: {
        color: 'green',
    },
    cancel: {
        color: 'red',
    },
})

export function Table(props) {
    const classes = useStyles()
    const {state} = useContext(Auth);
    const {doc,setalert} = props;
    const [link,setlink] = useState('')
    const Remove =()=>{
        removeTable(doc.id,state.user.branchstore).then(function() {
            setalert(prevState =>({...prevState,open:true,text:'ลบโต๊ะสำเร็จ',colorNotify:'success'}));
        })
        .catch(function() {
            setalert(prevState =>({...prevState,open:true,text:'ลบโต๊ะไม่สำเร็จ',colorNotify:'error'}));
        });;
    }
    const GenToken = async() =>{
        return await firebase.generateToken(doc.id)
    }
    useMemo(() => {
        GenToken().then((token)=>{
            setlink(token);
        })
    }, [])
    return (
        <Card className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={5} md={5}>
                    <Typography>ชื่อโต๊ะ <b>{doc.value.name}</b></Typography>
                </Grid>
                <Grid item xs={12} sm={5} md={5}>
                    <Typography>หมายเลขโต๊ะ <b>{doc.value.table_number}</b></Typography>
                </Grid>
                <Grid item xs={6} sm={2} md={2}>
                    <Box component='div'>
                        <Fab  component="button"  justify="center" alignItems="center" size={'small'}  color="secondary" aria-label="add" onClick={Remove}>
                            <DeleteIcon />
                        </Fab>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Box component='div' style={{textAlign:'center'}}>
                        <QRCode size={200} value={"http://192.168.0.174:3000/login/"+doc.value.table_number+"/"+link} />
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}
