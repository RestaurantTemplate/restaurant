import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import HomeIcon from '@material-ui/icons/Home'
import DescriptionIcon from '@material-ui/icons/Description'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import FaceIcon from '@material-ui/icons/Face'

import { Link, withRouter } from 'react-router-dom'
import firebase from '../firebase/config'
import { Auth } from '../context/authContext'

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
})

function TemporaryDrawer(props) {
    const classes = useStyles()

    const [userState, setUserState] = useState(null)
    const [userEmail, setUserEmail] = useState('')

    const { state, dispatch } = React.useContext(Auth)

    useEffect(() => {
        firebase.getUserState().then((user) => {
            if (user) {
                setUserState(user)
                setUserEmail(user.email)
            }
        })
    })

    const logout = () => {
        firebase.logout()
        setUserState(null)
        props.history.replace('/login')
        return dispatch({
            type: 'LOGOUT',
            payload: {},
        })
    }

    let menu = null
    const type = "manager"
    if (type) {
        menu = (
            <List>
                <ListItem button onClick={() => props.history.push("/dashboard")}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="หน้าหลัก" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="บันทึกการขาย" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="การจัดการ" />
                </ListItem>
            </List>
        )
    } else if (true) {
        menu = (
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="ออเดอร์" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="คิว" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="เช็คบิล" />
                </ListItem>
            </List>
        )
    }

    const list = () => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={props.toggleDrawer}
            onKeyDown={props.toggleDrawer}
        >
            <ListItem button>
                <ListItemIcon>
                    <FaceIcon />
                </ListItemIcon>
                <ListItemText
                    primary={
                        userState != null || state.user.hasOwnProperty('user')
                            ? userEmail
                            : ''
                    }
                />
            </ListItem>
            <Divider />
            {menu}
            <Divider />
            <ListItem button onClick={logout}>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="ออกจากระบบ" />
            </ListItem>
        </div>
    )

    return (
        <div>
            <React.Fragment>
                <Drawer
                    anchor="left"
                    open={props.state}
                    onClose={props.toggleDrawer}
                >
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    )
}

export default withRouter(TemporaryDrawer)
