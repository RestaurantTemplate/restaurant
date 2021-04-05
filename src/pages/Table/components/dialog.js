import React from 'react'
import {Dialog,DialogTitle,DialogActions,Button,DialogContent} from '@material-ui/core'
export const DialogValue = ({children,...props}) =>{
    const { onClose, open , onAddlist ,mode='add'} = props;
    return(
        <Dialog maxWidth='md' fullWidth={true} onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{mode === 'add' ? 'เพิ่มสาขา' : 'แก้ไขสาขา'}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onAddlist} color="primary" >
                    {mode === 'add' ? 'เพิ่ม' : 'แก้ไข'}
                </Button>
                <Button autoFocus onClick={onClose} color="primary" >
                    {'ย้อนกลับ'}
                </Button>
            </DialogActions>
        </Dialog>        
    )

}
