import React, { createContext, useState, useContext } from 'react'
import moment from 'moment'

import firebase from '../firebase/config'
import { Auth } from './authContext'

const MaindishContext = createContext({})

export function useMaindishContext() {
    return useContext(MaindishContext)
}

const initialMaindish = {
    name:'',
    desc:'',
    price:'',
    image_url:''
}

function MaindishProvider({ children }) {
    const [maindish, setmaindish] = useState(initialMaindish)
    function addAllState(value) {
        setmaindish(value);
    }
    function addState(name,value) {
        setmaindish(prevState => ({...prevState,[name]:value}));
    }

    const cartStore = {
        maindish,
        maindishAction: {
            addState,
            addAllState
        },
    }

    return (
        <MaindishContext.Provider value={cartStore}>
            {children}
        </MaindishContext.Provider>
    )
}

export default MaindishProvider
