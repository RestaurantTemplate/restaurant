import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Container,
    Paper,
    Typography,
    CircularProgress,
} from '@material-ui/core'

import firebase from '../../firebase/config'
import Queue from './components/Queue'
import BaseLayout from '../../components/BaseLayout'

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

    const fetchQueues = () => {
        setIsLoading(true)
        firebase.getQueues().onSnapshot((snapshot) => {
            let data = []
            snapshot.forEach((doc) => {
                var source = doc.metadata.hasPendingWrites ? 'Local' : 'Server'
                // console.log(source, ' data: ', doc.data())
                if (source === 'Server') {
                    data.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                }
            })
            setIsLoading(false)
            setQueues(data)
        })
    }

    useEffect(() => {
        fetchQueues()
    }, [])

    const removeQueueHandler = (index) => {
        // console.log('index', index)
        const queueId = queues[index].id
        firebase
            .removeQueue(queueId)
            .then((response) => {
                console.log('remove queue successful!!!')
                // console.log('response', response)
                const oldQueues = [...queues]
                oldQueues.splice(index, 1)
                setQueues(oldQueues)
                console.log('remove order', index)
            })
            .catch(() => {
                console.log('remove order failed!!!')
            })
    }

    let queueItems = queues.map((queue, index) => (
        <Queue
            key={queue.id}
            tableNumber={queue.table_number}
            orderNumber={queue.order_number}
            description={queue.desc}
            queueRemoved={() => removeQueueHandler(index)}
        />
    ))
    if (queues.length === 0 && isLoading) {
        queueItems = <CircularProgress />
    } else if (queues.length === 0) {
        queueItems = <Typography variant="h6">ไม่มีคิวในขณะนี้</Typography>
    }

    return (
        <BaseLayout>
            <Container>
                <Paper elevation={5} className={classes.paper}>
                    <Typography variant="h4" className={classes.textOrder}>
                        คิว
                    </Typography>
                    {queueItems}
                </Paper>
            </Container>
        </BaseLayout>
    )
}

export default Queues
