import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import moment from 'moment'

import {
    Container,
    Typography,
    CircularProgress,
    Paper,
    Button,
} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import BaseLayout from '../../../components/BaseLayout'

import firebase from '../../../firebase/config'
import SimpleModal from './Modal'

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow)

const useStyles = makeStyles({
    paper: {
        padding: '20px',
    },
    textHeader: {
        marginBottom: '10px',
        textDecoration: 'underline',
    },
    table: {
        minWidth: 700,
    },
})

function OrderSummary(props) {
    const classes = useStyles()

    const [orderSummary, setOrderSummary] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        props.history.replace('/billing')
        setOpen(false)
    }

    const customerId = props.match.params.id
    const tableNumber = props.match.params.table_number

    const checkout = (totalPrice) => {
        const history = {
            table_number: tableNumber,
            customer_id: customerId,
            orders: orderSummary,
            totol_price: totalPrice,
            created_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
            updated_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
        }
        console.log('history', history)
        firebase
            .addHistories(history)
            .then(() => {})
            .catch((error) =>
                console.log('addHistories error message:', error.message)
            )
        firebase
            .removeCustomer(customerId)
            .then((response) => {
                console.log('removeCustomer response', response)
                handleOpen()
            })
            .catch((error) =>
                console.log('removeCustomer error', error.message)
            )
        firebase
            .updateCustomerTable(tableNumber, '')
            .then(() => console.log('updateCustomerTable success'))
            .catch((error) =>
                console.log('updateCustomerTable error', error.message)
            )

        firebase
            .removeCustomerInUsers(customerId)
            .then(() => console.log('removeCustomerInUsers success'))
            .catch((error) =>
                console.log(
                    'removeCustomerInUsers error.message',
                    error.message
                )
            )
    }

    const fetchCustomerData = () => {
        firebase
            .getDataFromCustomer(customerId)
            .then(function (doc) {
                if (doc.exists) {
                    if (doc.data().orders) {
                        setOrderSummary(doc.data().orders)
                        console.log('getDataFromCustomer:', doc.data().orders)
                    }
                    // orders.push(order)
                } else {
                    console.log('No such document!')
                }
            })
            .catch(function (error) {
                console.log('Error getting document:', error)
            })
    }

    useEffect(() => {
        // fetchOrderSummary()
        fetchCustomerData()
    }, [])

    let orderSummaryItems = []

    if (orderSummary.length === 0 && isLoading) {
        orderSummaryItems = <CircularProgress />
    } else if (orderSummary.length === 0) {
        orderSummaryItems = <Typography variant="h6">ไม่มีออเดอร์</Typography>
    } else {
        let totalPriceSummary = 0
        let totalPrice = 0
        orderSummaryItems = (
            <React.Fragment>
                {orderSummary.map((order) => {
                    totalPrice = 0
                    return (
                        <Paper key={order.id} className={classes.paper}>
                            <Typography>
                                ออเดอร์ที่ {order.order_number}
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table
                                    className={classes.table}
                                    aria-label="customized table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>
                                                รายการ
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                จำนวน
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                ราคา
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                ราคารวม
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order.items.map((row) => {
                                            totalPriceSummary +=
                                                row.amount * row.price
                                            totalPrice += row.amount * row.price
                                            return (
                                                <StyledTableRow key={row.name}>
                                                    <StyledTableCell
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {row.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        {row.amount}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        {row.price}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        {row.amount * row.price}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Paper className={classes.paper}>
                                <Typography>
                                    รวมทั้งสิ้น {totalPrice} THB
                                </Typography>
                            </Paper>
                        </Paper>
                    )
                })}
                <Paper className={classes.paper}>
                    <Typography>รวมทั้งสิ้น {totalPriceSummary} THB</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => checkout(totalPriceSummary)}
                    >
                        เสร็จสิ้น
                    </Button>
                </Paper>
            </React.Fragment>
        )
    }

    return (
        <BaseLayout>
            <Container>
                <Paper elevation={5} className={classes.paper}>
                    <Typography variant="h5" className={classes.textHeader}>
                        โต๊ะที่ {tableNumber}
                    </Typography>
                    {orderSummaryItems}
                </Paper>
            </Container>
            <SimpleModal open={open} handleClose={handleClose} />
        </BaseLayout>
    )
}

export default withRouter(OrderSummary)
