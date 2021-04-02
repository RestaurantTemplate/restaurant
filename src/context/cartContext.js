import React, { createContext, useState, useContext } from 'react'
import moment from 'moment'

import firebase from '../firebase/config'
import { Auth } from '../context/authContext'

const CartContext = createContext({})

export function useCartContext() {
    return useContext(CartContext)
}

const initialCart = {
    items: [],
}

function CartProvider({ children }) {
    const [cart, setCart] = useState(initialCart)

    const { state } = useContext(Auth)

    console.log('cart items ', cart.items)

    function addToCart(menu) {
        const duplicatedItem = cart.items.find((item) => item.id === menu.id)
        if (duplicatedItem) {
            const newItems = cart.items.filter((item) => item.id !== menu.id)
            const oldAmount = duplicatedItem.amount
            const updatedAmout = oldAmount + 1
            const oldPrice = duplicatedItem.price
            const newPice = oldPrice + menu.price

            const updatedItem = {
                ...duplicatedItem,
                amount: updatedAmout,
                price: newPice,
            }
            setCart((prevCart) => ({
                ...prevCart,
                items: [...newItems, updatedItem],
            }))
        } else {
            setCart((prevCart) => ({
                ...prevCart,
                items: [...prevCart.items, menu],
            }))
        }
    }

    const orderConfirmed = () => {
        const order = {
            order_number: moment(new Date()).format('DDMMYYHHmmss'),
            table_number: state.user.table_number,
            customer_id: state.user.uid,
            ...cart.items,
            created_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
            updated_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
        }
        firebase
        .addOrder(order)
        .then((response) => console.log(response))
    }

    const cartStore = {
        cart,
        cartAction: {
            addToCart,
            orderConfirmed
        },
    }

    return (
        <CartContext.Provider value={cartStore}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
