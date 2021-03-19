import React from "react";
//firebaseauth reducer
import { firebaseAuth } from "../reducers/authReducer";


export const Auth = React.createContext();
let initialState = {
    user: null
}

export const AuthProvider = (props) => {

    const [state, dispatch] = React.useReducer(firebaseAuth, initialState);
    const value = {state, dispatch};

    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
        console.log('user [Local Storage]' , user)
        initialState.user = user
    }
    else {
        console.log('user [Local Storage]' , JSON.parse(user))
    }

    return <Auth.Provider value={value}>
                {props.children}
           </Auth.Provider>

}
