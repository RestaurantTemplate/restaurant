import React, { useState, useEffect } from 'react'

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

export default function Notification() {
    const classes = useStyles()
    const [notifications, setNotifications] = useState([])

    const [state, setState] = React.useState(false)

    useEffect(() => {
        fetchNotifications()
    }, [])

    const fetchNotifications = () => {
        // setIsLoading(true)
        firebase.getNotifications().onSnapshot(
            (snapshot) => {
                let data = []
                snapshot.forEach((doc) => {
                    var source = doc.metadata.hasPendingWrites
                        ? 'Local'
                        : 'Server'
                    if (source === 'Server') {
                        data.push({
                            id: doc.id,
                            ...doc.data(),
                        })
                    }
                })
                // setIsLoading(false)
                setNotifications(data)
                console.log('notifications', data)
            },
            function (error) {
                console.log('Notifications Error: ', error.message)
            }
        )
    }

    let notiItems = notifications.map((noti, index) => {
        let desc = ''
        if (noti.status)
            switch (noti.status) {
                case 'success':
                    desc = 'เสร็จเรียบร้อย เชิญรับอาหารได้ครับ'
                    break
                case 'pending':
                    desc = 'กำลังปรุงอาหาร กรุณารอสักครู่'
                    break
                default:
                    desc = 'เกิดข้อผิดพลาด'
                    break
            }

        return (
            <React.Fragment key={noti.id}>
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary={'ออเดอร์หมายเลข ' + noti.order_number}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {desc}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
            </React.Fragment>
        )
    })

    const toggleDrawer = () => {
        setState(!state)
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
            <Drawer anchor="right" open={state} onClose={toggleDrawer}>
                {list()}
            </Drawer>
        </React.Fragment>
    )
}
