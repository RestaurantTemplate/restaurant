import React, { useState, useEffect } from 'react'

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

export default function OrderSummary(props) {
    const classes = useStyles()

    const [orderSummary, setOrderSummary] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const customerId = props.match.params.id
    const tableNumber = props.match.params.table_number

    const checkout = () => {
        handleOpen()
        const history = {
            customer_id: customerId,
            orderHistory: orderSummary,
            totol_price: totalPrice,
            created_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
            updated_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
        }
        console.log('history', history)
        firebase
            .addHistories(history)
            .then(() => console.log('addHistories success'))
            .catch((error) =>
                console.log('addHistories error message:', error.message)
            )
    }

    const fetchOrderSummary = () => {
        setIsLoading(true)
        firebase
            .getOrderSummary(customerId)
            .then(function (querySnapshot) {
                setIsLoading(false)
                let data = []
                let totalSummaryPrice = 0
                querySnapshot.forEach(function (doc) {
                    const total_price = doc.data().amount * doc.data().price
                    data.push({
                        id: doc.id,
                        total_price: total_price,
                        ...doc.data(),
                    })
                    totalSummaryPrice += total_price
                })
                setTotalPrice(totalSummaryPrice)
                setOrderSummary(data)
                console.log('orderSummary', data)
            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error.nessage)
            })
    }

    useEffect(() => {
        fetchOrderSummary()
    }, [])

    let orderSummaryItems = []

    if (orderSummary.length === 0 && isLoading) {
        orderSummaryItems = <CircularProgress />
    } else if (orderSummary.length === 0) {
        orderSummaryItems = <Typography variant="h6">ไม่มีออเดอร์</Typography>
    } else {
        orderSummaryItems = (
            <React.Fragment>
                <TableContainer component={Paper}>
                    <Table
                        className={classes.table}
                        aria-label="customized table"
                    >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>รายการ</StyledTableCell>
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
                            {orderSummary.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.amount}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.price}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.total_price}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paper className={classes.paper}>
                    <Typography>รวมทั้งสิ้น {totalPrice} THB</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={checkout}
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
