import React, { useState, useEffect, useContext } from 'react'

import { withRouter } from 'react-router-dom'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Drawer from '@material-ui/core/Drawer'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import firebase from '../firebase/config'
import { Auth } from '../context/authContext'

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    root: {
        padding: '10px',
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}))

function Notification(props) {
    const classes = useStyles()
    const [notifications, setNotifications] = useState([])

    const [isOpen, setIsOpen] = useState(false)

    const { state, dispatch } = useContext(Auth)

    useEffect(() => {
        fetchNotifications()
    }, [])

    const logout = () => {
        console.log('props', props)
        firebase.logout()
        localStorage.clear()
        props.history.replace('/login')
        return dispatch({
            type: 'LOGOUT',
            payload: null,
        })
    }

    console.log('state user', state.user)

    const fetchNotifications = () => {
        firebase.getNotifications(state.user.uid).onSnapshot(
            (snapshot) => {
                let data = []
                snapshot.forEach((doc) => {
                    var source = doc.metadata.hasPendingWrites
                        ? 'Local'
                        : 'Server'
                    if (source === 'Server') {
                        if (doc.data().customer_id === state.user.uid) {
                            data.push({
                                id: doc.id,
                                ...doc.data(),
                            })
                        }
                    }
                })
                // setIsLoading(false)
                setNotifications(data)
                console.log('notifications', data)
            },
            function (error) {
                console.log('Notifications Error: ', error.message)
                logout()
            }
        )

        // firebase
        //     .getDataFromCustomer(state.user.uid)
        //     .then(function (doc) {
        //         if (doc.exists) {
        //             console.log('doc.exists', doc.data())
        //             if (doc.data().notifications) {
        //                 setNotifications(doc.data().notifications)
        //             }

        //             console.log('notifications:', doc.data().notifications)
        //         } else {
        //             console.log('No such document!')
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log('Error getting document:', error)
        //     })
    }

    let notiItems = notifications.map((noti, index) => {
        return (
            <React.Fragment key={noti.id}>
                <ListItem alignItems="flex-start">
                    <ListItemText
                        // primary={'ออเดอร์หมายเลข ' + noti.order_number}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {noti.message}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
            </React.Fragment>
        )
    })

    // if (notiItems.length === 0) {
    //     notiItems = (
    //         <React.Fragment>
    //             <ListItem alignItems="flex-start">
    //                 <ListItemText
    //                     // primary={'ออเดอร์หมายเลข ' + noti.order_number}
    //                     secondary={
    //                         <React.Fragment>
    //                             <Typography
    //                                 component="span"
    //                                 variant="body2"
    //                                 color="textPrimary"
    //                             >
    //                                 ยังไม่มีการแจ้งเตือน
    //                             </Typography>
    //                         </React.Fragment>
    //                     }
    //                 />
    //             </ListItem>
    //             <Divider variant="fullWidth" component="li" />
    //         </React.Fragment>
    //     )
    // }

    const toggleDrawer = () => {
        setIsOpen(!isOpen)
    }

    const list = () => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
        >
            <List className={classes.root}>
                <Typography
                    component="span"
                    variant="h5"
                    className={classes.inline}
                    color="textPrimary"
                >
                    การแจ้งเตือน
                </Typography>
                {notiItems}
                <Divider variant="fullWidth" component="li" />
            </List>
        </div>
    )

    return (
        <React.Fragment>
            <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={toggleDrawer}
            >
                <Badge badgeContent={notifications.length} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
                {list()}
            </Drawer>
        </React.Fragment>
    )
}

export default withRouter(Notification)
