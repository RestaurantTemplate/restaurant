import React, { createContext, useState, useContext } from 'react'

const CartContext = createContext({})

export function useCartContext() {
    return useContext(CartContext)
}

const initialCart = {
    items: []
}

function CartProvider({ children }) {
    const [cart, setCart] = useState(initialCart)

    function addToCart(menu) {
        setCart((prevCart) => ({
            ...prevCart,
            items: [...prevCart.items, menu],
        }))
    }

    const cartStore = {
        cart,
        cartAction: {
            addToCart,
        },
    }

    return (
        <CartContext.Provider value={cartStore}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
