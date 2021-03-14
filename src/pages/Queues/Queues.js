import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Container,
    Paper,
    Typography,
    CircularProgress,
} from '@material-ui/core'

import { withFirebase } from '../../firebase'
import Queue from './components/Queue/Queue'

const useStyles = makeStyles({
    paper: {
        padding: '20px',
    },
    textOrder: {
        marginBottom: '10px',
        textDecoration: 'underline',
    },
})

const Queues = (props) => {
    const [queues, setQueues] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const classes = useStyles()

    useEffect(() => {
        const fetchQueues = () => {
            setIsLoading(true)
            props.firebase.fetchQueues().onSnapshot((snapshot) => {
                let data = []
                snapshot.forEach((doc) => {
                    var source = doc.metadata.hasPendingWrites
                        ? 'Local'
                        : 'Server'
                    console.log(source, ' data: ', doc.data())
                    if (source === 'Server') {
                        data.push({
                            id: doc.id,
                            ...doc.data(),
                        })
                    }
                })
                console.log('orders', data)
                setIsLoading(false)
                setQueues(data)
            })
        }
        fetchQueues()
    }, [props.firebase])

    // const addOrderHandler = () => {}

    const removeOrderHandler = (queueNumber) => {
        const updatedOrders = queues.filter(
            (order) => queueNumber !== order.order_number
        )
        setQueues(updatedOrders)
        console.log('remove order')
    }

    let queueItems = queues.map((queue) => (
        <Queue
            key={queue.id}
            tableNumber={queue.table_number}
            orderNumber={queue.order_number}
            description={queue.desc}
            queueRemoved={() => removeOrderHandler(queue.order_number)}
        />
    ))
    if (queues.length === 0 && isLoading) {
        queueItems = <CircularProgress />
    } else if (queues.length === 0) {
        queueItems = <Typography variant="h6">ไม่มีคิวในขณะนี้</Typography>
    }

    return (
        <Container>
            <Paper elevation={5} className={classes.paper}>
                <Typography variant="h4" className={classes.textOrder}>
                    คิว
                </Typography>
                {queueItems}
            </Paper>
        </Container>
    )
}

export default withFirebase(Queues)
