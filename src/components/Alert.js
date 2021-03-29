import React from 'react'
import {Snackbar} from '@material-ui/core'
import {Alert} from '@material-ui/lab';
export const AlertDialog = (props) =>{
    const {onClose,alert} = props
    const {open=false,text = '',colorNotify=''} = alert;
    return(
        <Snackbar
            anchorOrigin={{ vertical: 'top',horizontal: 'center'}}
            open={open}
            onClose={onClose}          
        >
            <Alert onClose={onClose} severity={colorNotify}>
                {text}
            </Alert>
        </Snackbar>
    );
}