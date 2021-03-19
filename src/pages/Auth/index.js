import React from 'react'

import { HeaderLogin,HeaderLoginChildren } from '../../containers/index'
import Login from './Login'

export default function Layout() {
    return (
        <React.Fragment>
            <HeaderLogin background='gray'/>
            {/* <HeaderLoginChildren background='blueGradient'/> */}
            <Login />
        </React.Fragment>
    )
}
