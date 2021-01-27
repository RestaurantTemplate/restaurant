/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react';
import {
    Paper,
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    Table,
    TableRow

} from '@material-ui/core';
import { useStyles } from './../../../css/css';
export const Tablelist = (props) =>{
    const {head,value} = props;
    const [sum,setsum] = useState(0)
    const classes = useStyles();
    useEffect(() => {
        if(value.length > 0){
            let val = 0;
            for(let i=0;i<value.length;i++){
                val += value[i].price;
            }
            setsum(val)
        }
    }, [])
    return(
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    {
                        head.map((value)=>{
                            return(
                                <TableCell align={value.align}>{value.label}</TableCell>
                            );
                        })
                    }
                </TableRow>
                </TableHead>
                <TableBody>
                    {value.map((row,index) => (
                        <TableRow key={index}>
                            {
                                Object.keys(row).map((value,index) => (
                                    <TableCell align={head[index].align}>{row[value]}</TableCell>
                                ))
                            }
                            <TableCell align={'right'}>{row[value]}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow key={value.length+1}>
                        <TableCell />
                        <TableCell align={'right'}>{'ราคารวม'}</TableCell>
                        <TableCell align={'right'}>{sum}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}