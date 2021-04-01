/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useContext,useEffect} from 'react';
import {DialogValue,Tablelist} from '../components';
import {addBranchStore,editBranchStore} from '../../../firebase/branchstoreFirebase';
import {Auth} from './../../../context/authContext';
export const Dialoglist = (props) =>{
    const {open = false,setopen,setalert} = props;
    const {state} = useContext(Auth);
    const initialState = {
        name:'',
    }
    const [item, setitem] = useState(initialState)
    const onClose = () =>{
        setopen(false)
    }
    const onAddlist = () =>{
        addBranchStore(item,state.user.uid).then(function(docRef) {
            console.log("Tutorial created with ID: ", docRef.id);
            setalert(prevState =>({...prevState,open:true,text:'เพิ่มสาขาสำเร็จ',colorNotify:'success'}));
            setopen(false)
            setitem(initialState)
        })
        .catch(function(error) {
            console.error("Error adding Tutorial: ", error);
            setalert(prevState =>({...prevState,open:true,text:'เพิ่มสาขาไม่สำเร็จ',colorNotify:'error'}));
        });;
    }
    return(
        <DialogValue onClose={onClose} open={open} onAddlist={onAddlist}>
            <Tablelist item={item} setitem={setitem}/>
        </DialogValue>
    );
}
export const DialoglistEdit = (props) =>{
    const {open = false,setopen,setalert,doc} = props;
    const {state} = useContext(Auth);
    const initialState = {
        name:doc.value.name,
    }
    const [item, setitem] = useState(initialState)
    useEffect(() => {
        setitem({...item,name:doc.value.name})
    }, [])
    const onClose = () =>{
        setopen(false)
    }
    const onEditlist = () =>{
        editBranchStore(item,state.user.uid,doc.id).then(function() {
            setalert(prevState =>({...prevState,open:true,text:'แก้ไขสาขาสำเร็จ',colorNotify:'success'}));
            setopen(false)
            setitem(initialState)
        })
        .catch(function() {
            setalert(prevState =>({...prevState,open:true,text:'แก้ไขสาขาไม่สำเร็จ',colorNotify:'error'}));
        });;
    }
    return(
        <DialogValue mode={'edit'} onClose={onClose} open={open} onAddlist={onEditlist}>
            <Tablelist item={item} setitem={setitem}/>
        </DialogValue>
    );
}