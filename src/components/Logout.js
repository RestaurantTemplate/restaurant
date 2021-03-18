import React, { useState } from 'react'

import { withRouter } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import firebase from '../firebase/config'
import { Auth } from '../context/authContext'


function Logout(props) {
    const { state, dispatch } = React.useContext(Auth)

    const logout = () => {
        console.log('props',props)
        firebase.logout()
        localStorage.clear()
        props.history.replace('/login')
        return dispatch({
            type: 'LOGOUT',
            payload: {},
        })
    }

    return (
        <React.Fragment>
            <ListItem button onClick={logout}>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="ออกจากระบบ" />
            </ListItem>
        </React.Fragment>
    )
}

export default withRouter(Logout)
