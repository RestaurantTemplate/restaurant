import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Container,
    Paper,
    Typography,
    CircularProgress,
} from '@material-ui/core'

import firebase from '../../firebase/config'

import Order from './components/Order/Order'

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

    const addQueueHandler = (index) => {
        console.log('index', index)
        firebase
            .addQueues(orders[index])
            .then((response) => console.log(response))
    }

    const removeOrderHandler = (index) => {
        const orderId = orders[index].id
        firebase
            .removeOrders(orderId)
            .then((response) => {
                console.log('remove order successful!!!')
                console.log('response', response)
                const oldOrders = [...orders]
                oldOrders.splice(index, 1)
                setOrders(oldOrders)
                console.log('remove order', index)
            })
            .catch(() => {
                console.log('remove order failed!!!')
            })
    }

    let orderItems = orders.map((order, index) => (
        <Order
            key={order.id}
            tableNumber={order.table_number}
            orderNumber={order.order_number}
            description={order.desc}
            queueAdded={() => addQueueHandler(index)}
            orderRemoved={() => removeOrderHandler(index)}
        />
    ))
    if (orders.length === 0 && isLoading) {
        orderItems = <CircularProgress />
    } else if (orders.length === 0) {
        orderItems = <Typography variant="h6">ไม่มีออเดอร์ในขณะนี้</Typography>
    }

    return (
        <Container>
            <Paper elevation={5} className={classes.paper}>
                <Typography variant="h4" className={classes.textOrder}>
                    ออเดอร์
                </Typography>
                {orderItems}
            </Paper>
        </Container>
    )
}

export default Orders
