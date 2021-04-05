/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useContext,useEffect} from 'react';
import {DialogValue,Tablelist} from '../components';
import {addTable,editTable} from '../../../firebase/tableFirebase';
import {Auth} from '../../../context/authContext';
export const Dialoglist = (props) =>{
    const {open = false,setopen,setalert} = props;
    const {state} = useContext(Auth);
    const initialState = {
        name:'',
        table_number:''
    }
    const [item, setitem] = useState(initialState)
    const onClose = () =>{
        setopen(false)
    }
    const onAddlist = () =>{
        addTable(item,state.user.branchstore).then(function(docRef) {
            // console.log("Tutorial created with ID: ", docRef.id);
            setalert(prevState =>({...prevState,open:true,text:'เพิ่มโต๊ะสำเร็จ',colorNotify:'success'}));
            setopen(false)
            setitem(initialState)
        })
        .catch(function(error) {
            console.error("Error adding Tutorial: ", error);
            setalert(prevState =>({...prevState,open:true,text:'เพิ่มโต๊ะไม่สำเร็จ',colorNotify:'error'}));
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
        table_number:doc.value.table_number
    }
    const [item, setitem] = useState(initialState)
    useEffect(() => {
        setitem({...item,name:doc.value.name,table_number:doc.value.table_number})
    }, [open])
    const onClose = () =>{
        setopen(false)
    }
    const onEditlist = () =>{
        editTable(item,doc.id,state.user.branchstore).then(function(docRef) {
            console.log('docRef:',docRef)
            if(docRef === null){
                setalert(prevState =>({...prevState,open:true,text:'แก้ไขโต๊ะไม่สำเร็จ',colorNotify:'error'}));
            }
            else{
                setalert(prevState =>({...prevState,open:true,text:'แก้ไขโต๊ะสำเร็จ',colorNotify:'success'}));
                setopen(false)
                setitem(initialState)
            }
        })
        .catch(function(error) {
            console.error("Error Editing Tutorial: ", error);
            setalert(prevState =>({...prevState,open:true,text:'แก้ไขโต๊ะไม่สำเร็จ',colorNotify:'error'}));
        });;
    }
    return(
        <DialogValue mode={'edit'} onClose={onClose} open={open} onAddlist={onEditlist}>
            <Tablelist item={item} setitem={setitem}/>
        </DialogValue>
    );
}