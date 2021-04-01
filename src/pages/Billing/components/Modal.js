import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Button, Typography } from '@material-ui/core'
import moneyLogo from '../../../assets/images/money.png'

function rand() {
    return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
    const top = 50 + rand()
    const left = 50 + rand()

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        outline: 'none',
        textAlign: 'center',
    },
}))

export default function SimpleModal(props) {
    const classes = useStyles()
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle)

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Typography variant="h3">Check Out</Typography>
            <div>
                <img src={moneyLogo} width="auto" height="150" alt="moneyLogo" />
            </div>
            <Button variant="contained" color="primary" onClick={props.handleClose}>
                เสร็จสิ้น
            </Button>
        </div>
    )

    return (
        <div>
            <Modal open={props.open} onClose={props.handleClose}>
                {body}
            </Modal>
        </div>
    )
}
