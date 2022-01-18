import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Grid,Card,Box,Fab} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit';
import {AlertDialog} from '../../../components';
import {removeBranchStore} from '../../../firebase/branchstoreFirebase';
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
    const {setalert,doc} = props;
    const [open,setopen] = useState(false);
    const Remove =()=>{
        removeBranchStore(doc.id).then(function() {
            setalert(prevState =>({...prevState,open:true,text:'ลบสาขาสำเร็จ',colorNotify:'success'}));
        })
        .catch(function() {
            setalert(prevState =>({...prevState,open:true,text:'ลบสาขาไม่สำเร็จ',colorNotify:'error'}));
        });;
    }
    return (
        <Card className={classes.root}>
            <AlertDialog alert={alert} onClose={() => setalert({...alert,open:false})} />
            <Grid container spacing={3}>
                <Grid item xs={9} sm={10} md={11}>
                    <Typography><b>{doc.value.name}</b></Typography>
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
