import React from 'react'

import { Header } from '../../containers/index'
import Orders from '../pages/Orders/Orders'

export default function Layout() {
    return (
        <React.Fragment>
            <Header />
            <Orders />
        </React.Fragment>
    )
}
