import React, { useState } from 'react'

import AppBar from './AppBar'
import Drawer from './Drawer'

import { Header } from '../containers/Header'

import {useCustomerContext} from '../context/customerContext'

export default function Layout(props) {
    const [state, setState] = useState(false)
    const { setopen,setopenorder,openordersummary,setopenordersummary } = useCustomerContext();
    const toggleDrawer = () => {
        setState(!state)
    }

    return (
        <React.Fragment>
            <AppBar toggleDrawer={toggleDrawer} setopenmenu={setopen} setopenorder={setopenorder}  openordersummary={openordersummary} setopenordersummary={setopenordersummary}/>
            <Drawer state={state} toggleDrawer={toggleDrawer}/>
            <Header />
            {props.children}
        </React.Fragment>
    )
}
