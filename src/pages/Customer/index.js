import React,{useContext} from 'react'
import {useCustomerContext} from '../../context/customerContext'
import { Tabmenu, Dialoglist, DialogOrderlist, DialogOrderSummarylist } from './containers'
import './style.css'

function Customer() {
    const {open,setopen,openorder,setopenorder,openordersummary,setopenordersummary} = useCustomerContext();
    return (
        <React.Fragment>
            <Tabmenu />
            <Dialoglist open={open} setopen={setopen} />
            <DialogOrderlist open={openorder} setopen={setopenorder} />
            <DialogOrderSummarylist open={openordersummary} setopen={setopenordersummary} />
        </React.Fragment>
    )
}

export default Customer
