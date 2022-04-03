import React from 'react'

import { DialogOrderSummaryValue, OrderSummary } from '../components'

import { useCartContext } from '../../../context/cartContext'

export const DialogOrderSummarylist = (props) => {
    const { open, setopen } = props
    const { order,queues} = useCartContext()

    const onClose = () => {
        setopen(false)
    }
    return (
        <DialogOrderSummaryValue onClose={onClose} open={open}>
            <>
                <OrderSummary />
            </>
        </DialogOrderSummaryValue>
    )
}
