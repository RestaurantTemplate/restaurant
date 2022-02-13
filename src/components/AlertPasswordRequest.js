import React from 'react'
import {Dialog,DialogTitle,DialogActions,Button,DialogContent} from '@material-ui/core'
export const AlertPasswordRequest = ({children,...props}) =>{
    const { open , onDelete , setopen} = props;
    const handleClose = () => {
        setopen(false);
    };
    return(
        <Dialog maxWidth='md' fullWidth={true} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{'กรุณาระบุ Password  ให้ถูกต้อง'}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onDelete} color="secondary" >
                    {'ลบ'}
                </Button>
                <Button autoFocus onClick={handleClose} color="primary" >
                    {'ย้อนกลับ'}
                </Button>
            </DialogActions>
        </Dialog>        
    )

}