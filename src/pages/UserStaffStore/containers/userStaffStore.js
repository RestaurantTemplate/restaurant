import React,{useState,useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Grid,Card,Box,Fab} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography'
import {AlertDialog} from '../../../components';
import firebase from './../../../firebase/config';
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

export function UserStaffStore(props) {
    const classes = useStyles()
    const {setalert,doc,check,setcheck} = props;
    const [open,setopen] = useState(false);
    const Remove = async()=>{
        console.log('document:',doc)
        const user = await firebase.deleteStaff(doc.uid)
        console.log('success:',user)
        if(user.data.success){
            setalert(prevState =>({...prevState,open:true,text:'ลบ user สำเร็จ',colorNotify:'success'}));
            setcheck(!check)
        }
        else{
            setalert(prevState =>({...prevState,open:true,text:user.data.message,colorNotify:'error'}));
        }
    }
    return (
        <Card className={classes.root}>
            <AlertDialog alert={alert} onClose={() => setalert({...alert,open:false})} />
            <Grid container spacing={3}>
                <Grid item xs={9} sm={10} md={11}>
                    <Typography><b>{doc.email}</b></Typography>
                </Grid>
                <Grid item xs={3} sm={2} md={1}>
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
