import React, { useState, useEffect, useContext } from 'react'
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

import firebase from '../../../firebase/config'
import {Auth} from '../../../context/authContext';

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
    const {state} = useContext(Auth);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        props.history.replace('/billing')
        setOpen(false)
    }
    console.log('Order::Summary::',state)
    const customerId = props.match.params.id

    // const recommended = () => {
    //     orderSummary.map(order => {
    //         console.log('order', order)
    //     })
    // }

    const fetchCustomerData = () => {
        firebase
            .getDataFromCustomer(state.user.branchstore,state.user.uid)
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
        // recommended()
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
                </Paper>
            </React.Fragment>
        )
    }

    return (
        <>
            <Container>
                <Paper elevation={5} className={classes.paper}>
                    <Typography variant="h5" className={classes.textHeader}>
                        โต๊ะที่ {state.user.table_number}
                    </Typography>
                    {orderSummaryItems}
                </Paper>
            </Container>
        </>
    )
}
export default withRouter(OrderSummary)