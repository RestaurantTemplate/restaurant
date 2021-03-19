import React, { useState } from 'react'

import AppBar from './AppBar'
import Drawer from './Drawer'

import { Header } from '../containers/Header'

export default function Layout(props) {
    const [state, setState] = React.useState(false)

    const toggleDrawer = () => {
        setState(!state)
    }

    return (
        <React.Fragment>
            <AppBar toggleDrawer={toggleDrawer}/>
            <Drawer state={state} toggleDrawer={toggleDrawer}/>
            <Header/>
            {props.children}
        </React.Fragment>
    )
}
