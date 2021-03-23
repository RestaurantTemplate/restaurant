import React,{useState,useContext} from 'react';
import {DialogValue,Tablelist} from '../components';
// import {addBranchStore} from '../../../firebase/branchstoreFirebase';
import firebase from '../../../firebase/config';
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
        console.log()
        firebase.addBranchStore(item,state.user.uid);
    }
    return(
        <DialogValue onClose={onClose} open={open} onAddlist={onAddlist}>
            <Tablelist item={item} setitem={setitem}/>
        </DialogValue>
    );
}