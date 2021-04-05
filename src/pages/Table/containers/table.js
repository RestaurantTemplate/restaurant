import React,{useState,useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Grid,Card,Box,Fab} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit';
import {AlertDialog} from '../../../components';
import {removeTable} from '../../../firebase/tableFirebase';
import {DialoglistEdit} from './dialog';
import {Auth} from '../../../context/authContext';
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
    const initialAlert = {
        open:false,
        text:'',
        colorNotify:''
    }
    const [alertEdit,setalertEdit] = useState(initialAlert);
    const [open,setopen] = useState(false);
    const Remove =()=>{
        removeTable(doc.id,state.user.branchstore).then(function() {
            setalert(prevState =>({...prevState,open:true,text:'ลบโต๊ะสำเร็จ',colorNotify:'success'}));
        })
        .catch(function() {
            setalert(prevState =>({...prevState,open:true,text:'ลบโต๊ะไม่สำเร็จ',colorNotify:'error'}));
        });;
    }
    return (
        <Card className={classes.root}>
            <AlertDialog alert={alertEdit} onClose={() => setalertEdit({...alertEdit,open:false})} />
            <DialoglistEdit doc={doc} open={open} setopen={setopen} setalert={setalertEdit}/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4} md={5}>
                    <Typography>สาขาชื่อ <b>{doc.value.name}</b></Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={5}>
                    <Typography>หมายเลขโต๊ะ <b>{doc.value.table_number}</b></Typography>
                </Grid>
                <Grid item xs={6} sm={2} md={1}>
                    <Box component='div'>
                        <Fab  component="button"  justify="center" alignItems="center" size={'small'}  color="primary" aria-label="add" onClick={() => setopen(true)}>
                            <EditIcon />
                        </Fab>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={2} md={1}>
                    <Box component='div'>
                        <Fab  component="button"  justify="center" alignItems="center" size={'small'}  color="secondary" aria-label="add" onClick={Remove}>
                            <DeleteIcon />
                        </Fab>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}
