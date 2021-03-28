import React, { useState, useEffect } from 'react'

import { Container, Typography } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import BaseLayout from '../../../components/BaseLayout'

import firebase from '../../../firebase/config'

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

function createData(name, amount, price, totalPrice) {
    return { name, amount, price, totalPrice }
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237, 9.0, 37),
    createData('Eclair', 262, 16.0, 24),
    createData('Cupcake', 305, 3.7, 67),
    createData('Gingerbread', 356, 16.0, 49),
]

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

    const fetchOrderSummary = () => {
        setIsLoading(true)
        firebase.getOrderSummary().then(function (querySnapshot) {
            let data = []
            console.log('querySnapshot', querySnapshot)
            querySnapshot.forEach(function (doc) {
                data.push({
                    id: doc.id,
                    total_price: doc.data().amount * doc.data().price,
                    ...doc.data(),
                })
                console.log(doc.id, ' => ', doc.data())
            })
            setOrderSummary(data)
            console.log('orderSummary', data)

        })
        // .onSnapshot(
        //     (snapshot) => {
        //         let data = []
        //         snapshot.forEach((doc) => {
        //             var source = doc.metadata.hasPendingWrites
        //                 ? 'Local'
        //                 : 'Server'
        //             // console.log(source, ' data: ', doc.data())
        //             if (source === 'Server') {
        //                 data.push({
        //                     id: doc.id,
        //                     ...doc.data(),
        //                 })
        //             }
        //         })
        //         setIsLoading(false)
        //         setOrderSummary(data)
        //         console.log('orders', data)
        //     },
        //     function (error) {
        //         console.log('Orders Error:', error.message)
        //         setIsLoading(false)
        //     }
        // )
    }

    useEffect(() => {
        fetchOrderSummary()
    }, [])
    return (
        <BaseLayout>
            <Container>
                <Paper elevation={5} className={classes.paper}>
                    <Typography variant="h4" className={classes.textHeader}>
                        โต๊ะที่ 1
                    </Typography>
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
                                            {row.total_price}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </BaseLayout>
    )
}
