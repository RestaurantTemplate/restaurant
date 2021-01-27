import React,{useState,} from 'react';
import {DialogValue,Tablelist} from './../components';
export const Dialoglist = (props) =>{
    const {open,setopen,list,setlist} = props;
    const [head] = useState([{align:'left',label:'ชื่ออาหาร'},{align:'right',label:'จำนวน'},{align:'right',label:'ราคา'}])
    const onClose = () =>{
        setopen(false)
    }
    const onAddlist = () => {
        if(list.length > 0){
            alert("สั่งอาหารเรียบนร้อยแล้ว")
            setlist([]);
            setopen(false);            
        }
        else{
            alert("กรุณาเลือกอาหาร")
            setlist([]);
            setopen(false);   
        }

    };
    return(
        <DialogValue onClose={onClose} onAddlist={onAddlist} open={open}>
            <Tablelist head={head} value={list}/>
        </DialogValue>
    );
}