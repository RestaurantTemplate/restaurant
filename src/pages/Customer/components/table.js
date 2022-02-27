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
    IconButton
} from '@material-ui/core'
import { useStyles } from './../../../css/css'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { useCartContext } from '../../../context/cartContext'

export const Tablelist = () => {
    const [sum, setsum] = useState(0)
    const classes = useStyles()
    const { cart , cartAction } = useCartContext()

    useEffect(() => {
        if (cart.items.length > 0) {
            let val = 0
            for (let i = 0; i < cart.items.length; i++) {
                val += cart.items[i].price
            }
            setsum(val)
        }
    }, [])
    const onAdd = (index) => (event) =>{
        let value = {
            id: cart.items[index].id,
            name: cart.items[index].name,
            amount: 1,
            price:  cart.items[index].price,
            totalPrice: cart.items[index].price
        }
        cartAction.addToCart(value)
    }   
    const onDelete = (index) => (event) =>{
        let value = {
            id: cart.items[index].id,
            name: cart.items[index].name,
            amount: 1,
            price:  cart.items[index].price,
            totalPrice: cart.items[index].price
        }
        cartAction.deleteToCart(value)
    }   
    let totalPrice = 0
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">เพิ่ม/ลบ</TableCell>
                        <TableCell align="left">ชื่ออาหาร</TableCell>
                        <TableCell align="right">จำนวน</TableCell>
                        <TableCell align="right">ราคา</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.items.map((row,index) => {
                        totalPrice += row.amount * row.price
                        return (
                            <TableRow key={row.id}>
                                <TableCell align="center" style={{display:'flex'}}>
                                    <IconButton aria-label="add" color="primary" onClick={onAdd(index)}>
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" color="primary" onClick={onDelete(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
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
