import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'

import firebase from '../firebase/config'
import { Divider } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}))

export default function Notification() {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [notifications, setNotifications] = useState([])

    const fetchNotifications = () => {
        // setIsLoading(true)
        firebase.getNotifications().onSnapshot((snapshot) => {
            let data = []
            snapshot.forEach((doc) => {
                var source = doc.metadata.hasPendingWrites ? 'Local' : 'Server'
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
        })
    }

    useEffect(() => {
        fetchNotifications()
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    let notiItems = notifications.map((noti, index) => (
        <React.Fragment key={noti.id}>
            {/* <Divider /> */}
            <Typography >{noti.desc}</Typography>
        </React.Fragment>
    ))
    return (
        <React.Fragment>
            <IconButton
                aria-describedby={id}
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleClick}
            >
                <Badge badgeContent={notifications.length} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={classes.typography}>
                    <Typography>การแจ้งเตือน</Typography>
                    {notiItems}
                </div>
            </Popover>
        </React.Fragment>
    )
}
