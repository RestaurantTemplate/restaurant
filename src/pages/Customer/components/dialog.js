import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
} from '@material-ui/core'
export const DialogValue = ({ children, ...props }) => {
    const { onClose, selectedValue, open, onAddlist } = props
    const handleClose = () => {
        onClose(selectedValue)
    }
    return (
        <Dialog
            maxWidth="md"
            fullWidth={true}
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
        >
            <DialogTitle id="simple-dialog-title">รายการที่สั่ง</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onAddlist} color="primary">
                    {'สั่งอาหาร'}
                </Button>
                <Button autoFocus onClick={handleClose} color="primary">
                    {'ย้อนกลับ'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
