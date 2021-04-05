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

import Order from './components/Order'
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

const Orders = (props) => {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const classes = useStyles()

    const fetchOrders = () => {
        setIsLoading(true)
        // firebase.addOrders().then()
        firebase.getOrders().onSnapshot(
            (snapshot) => {
                let data = []
                snapshot.forEach((doc) => {
                    var source = doc.metadata.hasPendingWrites
                        ? 'Local'
                        : 'Server'
                    // console.log(source, ' data: ', doc.data())
                    if (source === 'Server') {
                        data.push({
                            id: doc.id,
                            ...doc.data(),
                        })
                    }
                })
                setIsLoading(false)
                setOrders(data)
                console.log('orders', data)
            },
            function (error) {
                console.log('Orders Error:', error.message)
                setIsLoading(false)
            }
        )
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const addQueueHandler = (orderId) => {
        const order = orders.find((order) => order.id === orderId)
        let queue = {
            customer_id: order.customer_id,
            order_number: order.order_number,
            table_number: order.table_number,
            items: order.items,
            created_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
            updated_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
        }
        firebase.addQueues(queue).then((response) => {
            removeOrderHandler(orderId)
            console.log(response)
        })
    }

    const removeOrderHandler = (orderId) => {
        const newOrders = orders.filter((order) => order.id !== orderId)
        firebase
            .removeOrders(orderId)
            .then((response) => {
                console.log('remove order successful!!!')
                setOrders(newOrders)
            })
            .catch(() => {
                console.log('remove order failed!!!')
            })
    }

    let orderItems = orders.map((order) => (
        <Order
            order={order}
            key={order.id}
            queueAdded={addQueueHandler}
            orderRemoved={removeOrderHandler}
        />
    ))
    if (orders.length === 0 && isLoading) {
        orderItems = <CircularProgress />
    } else if (orders.length === 0) {
        orderItems = <Typography variant="h6">ไม่มีออเดอร์ในขณะนี้</Typography>
    }

    return (
        <BaseLayout>
            <Container>
                <Paper elevation={5} className={classes.paper}>
                    <Typography variant="h4" className={classes.textOrder}>
                        ออเดอร์
                    </Typography>
                    {orderItems}
                </Paper>
            </Container>
        </BaseLayout>
    )
}

export default Orders
