import React,{useState,useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Grid,Card,Box,Fab,TextField} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit';
import {AlertDialog} from './../../../components';
import {removeBranchStore} from './../../../firebase/branchstoreFirebase';
import SendIcon from '@material-ui/icons/Send';
import {DialoglistEdit} from './dialog';
import { Auth } from '../../../context/authContext';
import Firebase from './../../../firebase/config';
import {AlertPasswordRequest} from './../../../components/AlertPasswordRequest'
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

export function BranchStore(props) {
    const classes = useStyles()
    const {setalert,doc} = props;
    const [open,setopen] = useState(false);
    const [error,seterror] = useState(false);
    const [openRemove,setopenRemove] = useState(false)
    const { state,dispatch } = useContext(Auth)
    const Remove =()=>{
        setopenRemove(true)
    }
    const setLocalStorage = async() =>{
        let user = JSON.parse(localStorage.getItem('user'));
        console.log('[localStorage]:',user);
        user['branchstore'] = doc.id;
        await Firebase.getBranchName(doc.id).then((docs)=>{
            user['name'] = docs.name;
            localStorage.setItem('user',JSON.stringify(user));
            dispatch({
                type: 'LOGIN',
                payload: user,
            })
            props.history.push('/dashboard')
        })
    }
    const onDelete = async() =>{
        const password = document.getElementById('input-password').value
        if(password){
            let response = await Firebase.login(state.user.email, password)
            if (response.hasOwnProperty('message')) {
                console.log(response.message)
            } else {
                Firebase
                    .getUserInfo(response.user.uid)
                    .then((docs) => {
                        if (docs.exists) {
                            removeBranchStore(doc.id).then(function() {
                                setalert(prevState =>({...prevState,open:true,text:'ลบสาขาสำเร็จ',colorNotify:'success'}));
                            })
                            .catch(function() {
                                setalert(prevState =>({...prevState,open:true,text:'ลบสาขาไม่สำเร็จ',colorNotify:'error'}));
                            });
                            seterror(false)
                        } else {
                            console.log('Not found user!')
                        }
                    })
                    .catch(function (error) {
                        console.log('[Login] error: ', error.message)
                    })
            }
        }
        else{
            seterror(true)
        }
    }
    return (
        <Card className={classes.root}>
            <AlertDialog alert={alert} onClose={() => setalert({...alert,open:false})} />
            <DialoglistEdit doc={doc} open={open} setopen={setopen} setalert={setalert}/>
            <AlertPasswordRequest onDelete={onDelete} open={openRemove} setopen={setopenRemove} >
                <TextField
                    id="input-password"
                    variant="outlined"
                    fullWidth
                    error={error}
                    label="Password"
                    type="password"
                    placeholder="Password"
                />
            </AlertPasswordRequest>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={6} md={9}>
                    <Typography>สาขาชื่อ <b>{doc.value.name}</b></Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={1}>
                    <Box component='div'>
                        <Fab  component="button"  justify="center" alignItems="center" size={'small'}  color="primary" aria-label="add" onClick={setLocalStorage}>
                            <SendIcon />
                        </Fab>
                    </Box>
                </Grid>
                <Grid item xs={2} sm={2} md={1}>
                    <Box component='div'>
                        <Fab  component="button"  justify="center" alignItems="center" size={'small'}  color="primary" aria-label="add" onClick={() => setopen(true)}>
                            <EditIcon />
                        </Fab>
                    </Box>
                </Grid>
                <Grid item xs={2} sm={2} md={1}>
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
