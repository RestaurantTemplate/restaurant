/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { cloneElement } from 'react';
import { AuthProvider } from '../context/authContext'
import CartProvider from '../context/cartContext'
import CustomerProvider from '../context/customerContext'
function CompareReducer({ contexts, children }) {
    return contexts.reduce(
        (kids, parent) =>
            cloneElement(parent, {
                children: kids
            }),
        children
    );
}
export default function ContextProvider({ children }) {
    return (
        <CompareReducer
            contexts={[
                <CartProvider />
                , <CustomerProvider />
                , <AuthProvider />
            ]}
        >
            {children}
        </CompareReducer>
    );
}