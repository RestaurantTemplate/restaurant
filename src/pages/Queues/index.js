import React from 'react'

import { Header } from '../../containers/index'
import Queues from './Queues'

export default function Layout() {
    return (
        <React.Fragment>
            <Header background='red'/>
            <Queues />
        </React.Fragment>
    )
}
