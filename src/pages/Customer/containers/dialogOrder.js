import React from 'react'

import { DialogOrderValue, TableOrderlist, TableQueueslist } from '../components'

import { useCartContext } from '../../../context/cartContext'

export const DialogOrderlist = (props) => {
    const { open, setopen } = props
    const { order,queues} = useCartContext()

    const onClose = () => {
        setopen(false)
    }
    return (
        <DialogOrderValue onClose={onClose} open={open}>
            <>
                {
                    (order[0] !== undefined) &&
                        <TableOrderlist />
                }       
                {
                    (queues[0] !== undefined) &&
                        <TableQueueslist />
                }     
            </>

        </DialogOrderValue>
    )
}
