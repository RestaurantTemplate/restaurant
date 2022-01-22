/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useContext,useEffect} from 'react';
import firebase from './../../../firebase/config';
import {DialogValue,Tablelist} from '../components';
import {addBranchStore,editBranchStore} from '../../../firebase/branchstoreFirebase';
import {Auth} from './../../../context/authContext';
export const Dialoglist = (props) =>{
    const {open = false,setopen,setalert,check,setcheck} = props;
    const {state} = useContext(Auth);
    const initialState = {
        name:'',
        password:''
    }
    const [item, setitem] = useState(initialState)
    const onClose = () =>{
        setopen(false)
    }
    const onAddlist = async() =>{
        const user = await firebase.createStaff(item.name,item.password,state.user.branchstore)
        console.log('success:',user)
        if(user.data.success){
            setalert(prevState =>({...prevState,open:true,text:'เพิ่ม user สำเร็จ',colorNotify:'success'}));
            setopen(false)
            setcheck(!check)
            setitem(initialState)
        }
        else{
            setalert(prevState =>({...prevState,open:true,text:user.data.message,colorNotify:'error'}));
        }
    }
    return(
        <DialogValue onClose={onClose} open={open} onAddlist={onAddlist}>
            <Tablelist item={item} setitem={setitem}/>
        </DialogValue>
    );
}