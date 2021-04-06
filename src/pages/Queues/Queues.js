import React, { useState, useEffect } from 'react'
import moment from 'moment'

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

    const alertToCustomer = (order) => {
        const alert = {
            order_number: order.order_number,
            status: 'success',
            message:
                'ออเดอร์หมายเลข ' + order.order_number + ' เสร็จเรียบร้อยแล้ว',
            created_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
            updated_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
        }

        // firebase
        //     .alertToCustomer(queue.customer_id, alert)
        //     .then(() => console.log('alert to customer success'))
        //     .catch((error) =>
        //         console.log('[alertToCustomer] error message:', error.message)
        //     )

        firebase
            .getDataFromCustomer(order.customer_id)
            .then(function (doc) {
                if (doc.exists) {
                    console.log('doc.exists', doc.data())
                    let notifications = null
                    if (doc.data().notifications) {
                        notifications = doc.data().notifications
                        notifications.push(alert)
                    } else {
                        notifications = []
                        notifications.push(alert)
                    }
                    console.log('notifications:', notifications)

                    firebase
                        .updatedCustomerNotificaitons(order.customer_id, notifications)
                        .then(() => {
                            // removeQueueHandler(order.id)
                            console.log('updatedCustomerNotificaitons success')
                        })
                        .catch((error) =>
                            console.log(
                                'updatedCustomerNotificaitons error message ',
                                error.message
                            )
                        )
                } else {
                    console.log('No such document!')
                }
            })
            .catch(function (error) {
                console.log('Error getting document:', error)
            })
    }

    const removeQueueHandler = (queueId) => {
        const newQueues = queues.filter((queue) => queue.id !== queueId)
        // const queueId = queues[index].id
        firebase
            .removeQueue(queueId)
            .then((response) => {
                console.log('remove queue successful!!!')
                // console.log('response', response)
                // const oldQueues = [...queues]
                // oldQueues.splice(index, 1)
                setQueues(newQueues)
                // console.log('remove order', index)
            })
            .catch(() => {
                console.log('remove order failed!!!')
            })
    }

    const addOrderToCustomerOrders = (order) => {
        firebase
            .getDataFromCustomer(order.customer_id)
            .then(function (doc) {
                if (doc.exists) {
                    console.log('doc.exists', doc.data())
                    let orders = null
                    if (doc.data().orders) {
                        orders = doc.data().orders
                        orders.push(order)
                    } else {
                        orders = []
                        orders.push(order)
                    }
                    console.log('orders:', orders)

                    firebase
                        .updatedCustomerOrders(order.customer_id, orders)
                        .then(() => {
                            removeQueueHandler(order.id)
                            console.log('addOrderToCustomerOrders success')
                        })
                        .catch((error) =>
                            console.log(
                                'addOrderToCustomerOrders error message ',
                                error.message
                            )
                        )
                } else {
                    console.log('No such document!')
                }
            })
            .catch(function (error) {
                console.log('Error getting document:', error)
            })
    }

    const queueHandle = (queue) => {
        addOrderToCustomerOrders(queue)
        // removeQueueHandler(queue.id)
    }

    let queueItems = queues.map((queue, index) => (
        <Queue
            key={queue.id}
            queue={queue}
            alert={alertToCustomer}
            addOrderToCustomerOrders={addOrderToCustomerOrders}
            queueHandle={queueHandle}
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
