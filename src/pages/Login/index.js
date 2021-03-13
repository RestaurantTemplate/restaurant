import React from 'react'

import { Header } from '../../containers/index'
import Login from './Login'

export default function Layout() {
    return (
        <React.Fragment>
            <Header background='red'/>
            <Login />
        </React.Fragment>
    )
}
