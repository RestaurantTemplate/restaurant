import React, { createContext, useState, useContext } from 'react'

const CustomerContext = createContext({})

export function useCustomerContext() {
    return useContext(CustomerContext)
}

function CustomerProvider({ children }) {
    const [open,setopen] = useState(false);
    const [openorder,setopenorder] = useState(false);
    const [openordersummary,setopenordersummary] = useState(false);
    const customerStore = {
        open,
        setopen,
        openorder,
        setopenorder,
        openordersummary,
        setopenordersummary
    }

    return (
        <CustomerContext.Provider value={customerStore}>
            {children}
        </CustomerContext.Provider>
    )
}

export default CustomerProvider
