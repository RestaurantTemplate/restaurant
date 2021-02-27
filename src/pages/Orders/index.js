import React from 'react'

import { Header } from '../../containers/index'
import Orders from './Orders'

export default function Layout() {
    return (
        <React.Fragment>
            <Header background='red'/>
            <Orders />
        </React.Fragment>
    )
}
