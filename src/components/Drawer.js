import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import HomeIcon from '@material-ui/icons/Home'
import DescriptionIcon from '@material-ui/icons/Description'
import FaceIcon from '@material-ui/icons/Face'

import { withRouter } from 'react-router-dom'
import { Auth } from '../context/authContext'
import Logout from './Logout'

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

    const { state, dispatch } = React.useContext(Auth)

    let menu = null
    if (state.user.type === "manager") {
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
    } else if (state.user.type === "staff") {
        menu = (
            <List>
                <ListItem button onClick={() => props.history.push("/orders")}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="ออเดอร์" />
                </ListItem>
                <ListItem button onClick={() => props.history.push("/queues")}>
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="คิว" />
                </ListItem>
                <ListItem button onClick={() => props.history.push("/billing")}>
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
                    primary={state.user.email}
                />
            </ListItem>
            <Divider />
            {menu}
            <Divider />
            <Logout/>
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
