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
    const [order, setorder] = useState([])
    const [queues, setqueues] = useState([])
    const { state } = useContext(Auth)

    console.log('cart items ', cart.items)
    function deleteToCart(menu) {
        const duplicatedItem = cart.items.find((item) => item.id === menu.id)
        console.log('deleteToCart', menu)
        if (duplicatedItem) {
            if(duplicatedItem.amount === 1){
                //months.splice(4, 1);
                const newItems = cart.items.filter((item) => item.id !== menu.id)
                // const index = cart.items.findIndex((item) => item.id !== menu.id)

                setCart((prevCart) => ({
                    ...prevCart,
                    items: [...newItems],
                }))
            }
            else{
                const newItems = cart.items.filter((item) => item.id !== menu.id)
                const oldAmount = duplicatedItem.amount
                const updatedAmout = oldAmount - menu.amount
                // const oldPrice = duplicatedItem.price
                const newPice = duplicatedItem.price * updatedAmout
    
                const updatedItem = {
                    ...duplicatedItem,
                    amount: updatedAmout,
                    totalPrice: newPice
                }
                setCart((prevCart) => ({
                    ...prevCart,
                    items: [...newItems, updatedItem],
                }))
            }
        }
    }
    function addToCart(menu) {
        const duplicatedItem = cart.items.find((item) => item.id === menu.id)
        console.log('addToCart', menu)
        if (duplicatedItem) {
            const newItems = cart.items.filter((item) => item.id !== menu.id)
            const oldAmount = duplicatedItem.amount
            const updatedAmout = oldAmount + menu.amount
            // const oldPrice = duplicatedItem.price
            const newPice = duplicatedItem.price * updatedAmout

            const updatedItem = {
                ...duplicatedItem,
                amount: updatedAmout,
                totalPrice: newPice
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
            items: cart.items,
            created_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
            updated_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
        }
        firebase
        .addOrder(state.user.branchstore,order)
        .then(() => {
            setCart(initialCart)
        })
        .catch(error => console.log('orderConfirmed error:', error.message))
       
    }

    const cartStore = {
        cart,
        cartAction: {
            addToCart,
            deleteToCart,
            orderConfirmed
        },
        order, 
        setorder,
        queues, 
        setqueues
    }

    return (
        <CartContext.Provider value={cartStore}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
