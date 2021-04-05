import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

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

    const { queue, queueRemoved, alert, queueHandle } = props

    return (
        <Card className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={5} sm={4} md={2}>
                    <Typography>โต๊ะที่ {queue.table_number}</Typography>
                    <IconButton onClick={() => alert(queue)}>
                        <NotificationsActiveIcon />
                    </IconButton>
                    <IconButton onClick={() => queueHandle(queue)}>
                        <CheckCircleOutlineIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={7} sm={8} md={10}>
                    <Typography>รายละเอียด</Typography>
                    {queue.items.map((item, index) => (
                        <Box key={index} className={classes.description}>
                            <Typography>{item.name} จำนวน {item.amount}</Typography>
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </Card>
    )
}
