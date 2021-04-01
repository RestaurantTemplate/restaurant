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
    const [head] = useState([
        { align: 'left', label: 'ชื่ออาหาร' },
        { align: 'right', label: 'จำนวน' },
        { align: 'right', label: 'ราคา' },
    ])
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
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {head.map((value, index) => {
                            return (
                                <TableCell key={index} align={value.align}>
                                    {value.label}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.items.map((row, index) => (
                        <TableRow key={index}>
                            {Object.keys(row).map((value, index) => (
                                <TableCell
                                    key={index}
                                    align={head[index].align}
                                >
                                    {row[value]}
                                </TableCell>
                            ))}
                            <TableCell align={'right'}>
                                {row[cart.items]}
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow key={cart.items.length + 1}>
                        <TableCell />
                        <TableCell align={'right'}>{'ราคารวม'}</TableCell>
                        <TableCell align={'right'}>{sum}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
