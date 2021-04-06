/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import {
    Paper,
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    Table,
    TableRow,
} from '@material-ui/core'
import { useStyles } from './../../../css/css'

import { useCartContext } from '../../../context/cartContext'

export const Tablelist = () => {
    const [sum, setsum] = useState(0)
    const classes = useStyles()
    const { cart } = useCartContext()

    useEffect(() => {
        if (cart.items.length > 0) {
            let val = 0
            for (let i = 0; i < cart.items.length; i++) {
                val += cart.items[i].price
            }
            setsum(val)
        }
    }, [])

    let totalPrice = 0
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">ชื่ออาหาร</TableCell>
                        <TableCell align="right">จำนวน</TableCell>
                        <TableCell align="right">ราคา</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.items.map((row) => {
                        totalPrice += row.amount * row.price
                        return (
                            <TableRow key={row.id}>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="right">
                                    {row.amount}
                                </TableCell>
                                <TableCell align="right">{row.amount * row.price}</TableCell>
                            </TableRow>
                        )
                    })}
                    <TableRow>
                        <TableCell />
                        <TableCell align="right">ราคารวม</TableCell>
                        <TableCell align="right">{totalPrice}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
