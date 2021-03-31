import React from 'react'
import {Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
export const AlertDialog = (props) =>{
    const {onClose,alert} = props
    const {open=false,text = '',colorNotify=''} = alert;
    return(
        <Snackbar
            anchorOrigin={{ vertical: 'top',horizontal: 'center'}}
            autoHideDuration={2000} 
            open={open}
            onClose={onClose}          
        >
            <MuiAlert elevation={6} variant="filled" onClose={onClose} severity={colorNotify}>
                {text}
            </MuiAlert>
        </Snackbar>
    );
}