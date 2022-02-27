import React,{useContext} from 'react'
import {useCustomerContext} from '../../context/customerContext'
import { Tabmenu, Dialoglist, DialogOrderlist } from './containers'
import './style.css'

function Customer() {
    const {open,setopen,openorder,setopenorder} = useCustomerContext();
    return (
        <React.Fragment>
            <Tabmenu />
            <Dialoglist open={open} setopen={setopen} />
            <DialogOrderlist open={openorder} setopen={setopenorder} />
        </React.Fragment>
    )
}

export default Customer
