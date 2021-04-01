import React, { useState } from 'react'

import { Tabmenu, Dialoglist } from './containers'
import BaseLayout from '../../components/BaseLayout'
import './style.css'
import CartProvider from '../../context/cartContext'

function Customer(props) {
    const [open, setopen] = useState(false)

    return (
        <React.Fragment>
            <CartProvider>
                <BaseLayout setopenmenu={setopen}>
                    <Tabmenu />
                </BaseLayout>
                <Dialoglist open={open} setopen={setopen} />
            </CartProvider>
        </React.Fragment>
    )
}

export default Customer
