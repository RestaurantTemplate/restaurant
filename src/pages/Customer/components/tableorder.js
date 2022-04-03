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
import { useStyles } from '../../../css/css'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { useCartContext } from '../../../context/cartContext'

export const TableOrderlist = () => {
    const [sum, setsum] = useState(0)
    const classes = useStyles()
    const { order } = useCartContext()

    // useEffect(() => {
    //     if (order[0][0].items.length > 0) {
    //         let val = 0
    //         for (let i = 0; i < order[0][0].items.length; i++) {
    //             val += order[0][0].items[i].price
    //         }
    //         setsum(val)
    //     }
    // }, [])
    useEffect(()=>{
        let arr = []
        for(let i=0;i<order.length;i++){
            let value = 0;
            if(order[i].length > 0){
                for(let j=0;j<order[i][0].items.length;j++){
                    value += parseInt(order[i][0].items[j].totalPrice);
                }
                arr.push(value)
            }
        }
        {console.log('::sum::',arr)}
        setsum(arr)
    },[])
    return (
        <>
        {
            order.map((value,index)=>
                <>
                    {
                        value.length > 0 ?
                        <>
                            <h4>{'เลข order :' + value[0].order_number}</h4>
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
                                            <>
                                                {value[0].items.map((row) => {
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
                                                    <TableCell align="center" style={{backgroundColor:'#dc143c'}}>รอเข้าคิว</TableCell>
                                                    <TableCell align="right">ราคารวม</TableCell>
                                                    <TableCell align="right">{sum[index]}</TableCell>
                                                </TableRow>
                                                {console.log('::sum::',sum[index])}
                                            </>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <br/>
                        </>
                        :<></>
                    }
                </>
            )
        }     
        </>
    )
}
