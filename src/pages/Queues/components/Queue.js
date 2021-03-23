import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

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

export default function Queue(props) {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={5} sm={4} md={2}>
                    <Typography>โต๊ะที่ {props.tableNumber}</Typography>
                    <IconButton>
                        <NotificationsActiveIcon />
                    </IconButton>
                    <IconButton onClick={props.queueRemoved}>
                        <CheckCircleOutlineIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={7} sm={8} md={10}>
                    <Typography>รายละเอียด</Typography>
                    <Box className={classes.description}>
                        <Typography >{props.description}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}
