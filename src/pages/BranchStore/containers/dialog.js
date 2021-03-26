import React,{useState,useContext} from 'react';
import {DialogValue,Tablelist} from '../components';
import {addBranchStore} from '../../../firebase/branchstoreFirebase';
import {Auth} from './../../../context/authContext';
export const Dialoglist = (props) =>{
    const {open,setopen,list,setlist} = props;
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
            // alert('เพิ่มสาขาสำเร็จ')
            setopen(false)
            setitem(initialState)
        })
        .catch(function(error) {
            console.error("Error adding Tutorial: ", error);
            alert('เพิ่มสาขาไม่สำเร็จ')
        });;
    }
    return(
        <DialogValue onClose={onClose} open={open} onAddlist={onAddlist}>
            <Tablelist item={item} setitem={setitem}/>
        </DialogValue>
    );
}