import React,{useContext} from 'react'
import {useCustomerContext} from '../../context/customerContext'
import { Tabmenu, Dialoglist } from './containers'
import './style.css'

function Customer() {
    const {open,setopen} = useCustomerContext();
    return (
        <React.Fragment>
            <Tabmenu />
            <Dialoglist open={open} setopen={setopen} />
        </React.Fragment>
    )
}

export default Customer
