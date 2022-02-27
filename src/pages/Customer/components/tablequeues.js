/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
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
import { Auth } from '../../../context/authContext'
import {getCustomerNotifications} from '../../../firebase/customerFirebase';
export const TableQueueslist = () => {
    const [sum, setsum] = useState([])
    const [check,setcheck] = useState([])
    const classes = useStyles()
    const { queues } = useCartContext()
    const { state } = React.useContext(Auth)
    useEffect(()=>{
        let arr = []
        for(let i=0;i<queues.length;i++){
            let value = 0;
            for(let j=0;j<queues[i][0].items.length;j++){
                value += parseInt(queues[i][0].items[j].totalPrice);
            }
            arr.push(value)
        }
        setsum(arr)
    },[])
    useEffect(()=>{
        getCustomerNotifications(state.user.branchstore).onSnapshot((snapshot) => {
            let arr = []
            for(let i=0;i<queues.length;i++){
                let valueCheck = false
                for(let j=0;j<snapshot.docs.length;j++ ){
                    let data = snapshot.docs[j].data();
                    console.log('text:',data.order_number,queues[i][0].order_number)
                    if(data.order_number === queues[i][0].order_number){

                        valueCheck = true
                    }
                }
                arr.push(valueCheck)
            }
            setcheck(arr)
        })
    },[])
    return (
        <>
        {
            queues.map((queue,index)=>
                <>
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
                                {queue[0].items.map((row,index) => {
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
                                    {
                                        check !== [] &&
                                            check[index] ?
                                                <TableCell align="center" style={{backgroundColor:'#32CD32'}}>อาหารที่สั่งไว้เสร็จเรียบร้อยแล้ว</TableCell>
                                                :<TableCell align="center" style={{backgroundColor:'#00bfff'}}>รอรับอาหาร</TableCell>
                                    }
                                    <TableCell align="right">ราคารวม</TableCell>
                                    <TableCell align="right">{sum[index]}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br/>
                </>
            )
        }        
        </>

    )
}
