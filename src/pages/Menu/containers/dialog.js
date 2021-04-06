/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react';
import {DialogValue,Tablelist} from './../components';
import {useMaindishContext} from './../../../context/maindishesContext';
export const Dialoglist = (props) =>{
    const {alert,setalert,open,setopen,number} = props;
    const onClose = () =>{
        setopen(false)
    }
    return(
        <DialogValue number={number} alert={alert} setalert={setalert} onClose={onClose} open={open} setopen={setopen}>
            <Tablelist />
        </DialogValue>
    );
}
export const DialoglistEdit = (props) =>{
    const {doc,alert,setalert,open,setopen} = props;
    const {maindish,maindishAction} = useMaindishContext();
    const onClose = () =>{
        setopen(false)
    }
    useEffect(() => {
        console.log(doc)
    }, [])
    return(
        <DialogValue alert={alert} setalert={setalert} onClose={onClose} open={open} setopen={setopen}>
            <Tablelist />
        </DialogValue>
    );
}