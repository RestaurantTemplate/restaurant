import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'

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

export default function Order(props) {
    const classes = useStyles()

    const { order, queueAdded, orderRemoved } = props

    console.log('items', order.items)

    return (
        <Card className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={5} sm={3} md={3}>
                    <Typography>โต๊ะที่ {order.table_number}</Typography>
                    <Typography>ออเดอร์ที่ {order.order_number}</Typography>
                    <IconButton className={classes.accept} onClick={() => queueAdded(order.id)}>
                        <CheckCircleOutlineIcon />
                    </IconButton>
                    <IconButton
                        className={classes.cancel}
                        onClick={() => orderRemoved(order.id)}
                    >
                        <CancelOutlinedIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={7} sm={9} md={9}>
                    <Typography>รายละเอียด</Typography>
                    {order.items.map((item, index) => (
                        <Box key={index} className={classes.description}>
                            {item.name} จำนวน {item.amount}
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </Card>
    )
}
