import React,{useState,} from 'react';
import {DialogValue,Tablelist} from './../components';
export const Dialoglist = (props) =>{
    const {open,setopen,list,setlist} = props;
    const onClose = () =>{
        setopen(false)
    }
    return(
        <DialogValue onClose={onClose} open={open}>
            <Tablelist list={list} setlist={setlist}/>
        </DialogValue>
    );
}