import React,{useState} from 'react'
import clsx from 'clsx';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import LocalGroceryStoreSharpIcon from '@material-ui/icons/LocalGroceryStoreSharp';
import { useStyles } from '../css/css';
export const Layoutbar = ({children,...props}) =>{
    const classes = useStyles({black:{backgroundColor:'black'}});
    const {isSidebar,isNotification,menu,setopenmenu,topath} = props
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
                                <Badge badgeContent={menu != null && menu.length > 0 ? menu.length : null } color="secondary" onClick={() => setopenmenu(true)}>
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
                        {topath.map((value, index) => (
                        <ListItem button component={Link} key={index} to={value.path} >
                            <ListItemIcon >
                                {value.icon}
                            </ListItemIcon>
                            <ListItemText primary={value.name} />
                        </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
            <main >
                {children}
            </main>
        </>
    );
}