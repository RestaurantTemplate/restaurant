import React, { useState } from 'react'

import AppBar from './AppBar'
import Drawer from './Drawer'

export default function Layout(props) {
    const [state, setState] = React.useState(false)

    const toggleDrawer = () => {
        setState(!state)
    }

    return (
        <div>
            <AppBar toggleDrawer={toggleDrawer}/>
            <Drawer state={state} toggleDrawer={toggleDrawer}/>
            {props.children}
        </div>
    )
}
