import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Container,
    Paper,
    Typography,
    CircularProgress,
} from '@material-ui/core'

import { withFirebase } from '../../firebase'
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

    useEffect(() => {
        const fetchOrders = () => {
            setIsLoading(true)
            props.firebase.fetchOrders().onSnapshot((snapshot) => {
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
                setOrders(data)
            })
        }
        fetchOrders()
    }, [props.firebase])

    // const addOrderHandler = () => {}

    const removeOrderHandler = (orderNumber) => {
        const updatedOrders = orders.filter(
            (order) => orderNumber !== order.order_number
        )
        setOrders(updatedOrders)
        console.log('remove order')
    }

    let orderItems = orders.map((order) => (
        <Order
            key={order.id}
            tableNumber={order.table_number}
            orderNumber={order.order_number}
            description={order.desc}
            orderRemoved={() => removeOrderHandler(order.order_number)}
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

export default withFirebase(Orders)
