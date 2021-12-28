import React, { useState } from 'react'

import AppBar from './AppBar'
import Drawer from './Drawer'

import { Header } from '../containers/Header'

import {useCustomerContext} from '../context/customerContext'

export default function Layout(props) {
    const [state, setState] = useState(false)
    const { setopen } = useCustomerContext();
    const toggleDrawer = () => {
        setState(!state)
    }

    return (
        <React.Fragment>
            <AppBar toggleDrawer={toggleDrawer} setopenmenu={setopen}/>
            <Drawer state={state} toggleDrawer={toggleDrawer}/>
            <Header/>
            {props.children}
        </React.Fragment>
    )
}
