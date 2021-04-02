import React from 'react'

import { DialogValue, Tablelist } from './../components'

import { useCartContext } from '../../../context/cartContext'

export const Dialoglist = (props) => {
    const { open, setopen } = props
    const { cart, cartAction } = useCartContext()

    const onClose = () => {
        setopen(false)
    }
    const onAddlist = () => {
        if (cart.items.length > 0) {
            cartAction.orderConfirmed()
            alert('สั่งอาหารเรียบนร้อยแล้ว')
            // TO DO
            // Oreder
            setopen(false)
        } else {
            alert('กรุณาเลือกอาหาร')
            setopen(false)
        }
    }
    return (
        <DialogValue onClose={onClose} onAddlist={onAddlist} open={open}>
            <Tablelist />
        </DialogValue>
    )
}
