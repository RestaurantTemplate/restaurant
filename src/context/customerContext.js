import React, { createContext, useState, useContext } from 'react'

const CustomerContext = createContext({})

export function useCustomerContext() {
    return useContext(CustomerContext)
}

function CustomerProvider({ children }) {
    const [open,setopen] = useState(false);
    const customerStore = {
        open,
        setopen
    }

    return (
        <CustomerContext.Provider value={customerStore}>
            {children}
        </CustomerContext.Provider>
    )
}

export default CustomerProvider
