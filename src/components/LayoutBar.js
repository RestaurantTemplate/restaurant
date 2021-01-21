import React,{useState} from 'react'
import clsx from 'clsx';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Grid,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import LocalGroceryStoreSharpIcon from '@material-ui/icons/LocalGroceryStoreSharp';
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { useStyles } from '../css/css';
export const Layoutbar = ({children,...props}) =>{
    const classes = useStyles();
    const {isSidebar,isNotification,list,setopen} = props
    const [opensidebar, setopensidebar] = useState(false);

    const handleDrawerOpen = () => {
        setopensidebar(true);
    };
  
    const handleDrawerClose = () => {
        setopensidebar(false);
    };
    return(
        <>
        <AppBar
            className={clsx(classes.appBar)}
            position="relative"
            
        >
            <Toolbar variant="dense" align="center">
                {
                    isSidebar ?
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, opensidebar && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        :<></>
                }

                <div className={classes.grow} />
                <Typography
                    className={classes.paddingText}
                    variant="h6"
                    color="inherit"
                    align="center"
                >
                    EZ
                </Typography>
                <Typography
                    className={classes.backgroundAquamarine}
                    variant="h6"
                    color="inherit"
                    align="center"
                >
                    restaurant
                </Typography>
                <div className={classes.grow} />
                {
                    isNotification ?
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                aria-label="show 4 new mails"
                                color="inherit"
                            >
                                <Badge badgeContent={list != null && list.length > 0 ? list.length : null } color="secondary" onClick={() => setopen(true)}>
                                    <LocalGroceryStoreSharpIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </div>
                        :<></>
                }
            </Toolbar>
        </AppBar>
        {/* <Grid Container> */}
            <Drawer
                className={classes.drawer}
                variant="temporary"
                anchor="left"
                open={opensidebar}
                onClose={handleDrawerClose}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader} />
                <div className={classes.drawerContainer} >
                    <List>
                        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
            <main >
                {children}
            </main>
        {/* </Grid> */}
        </>
    );
}