import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Badge from '@material-ui/core/Badge'
import LocalGroceryStoreSharpIcon from '@material-ui/icons/LocalGroceryStoreSharp'

import Notification from './Notification'
import AppLogo from './AppLogo'

import { Auth } from '../context/authContext'
import { useCartContext } from '../context/cartContext'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'flex',
    },
    backgroundAquamarine: {
        paddingLeft: '10px',
        paddingRight: '10px',
        backgroundColor: '#00bfff',
    },
    paddingText: {
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    backgroundBlack: {
        backgroundColor: 'black',
    },
}))

function PrimarySearchAppBar(props) {
    const classes = useStyles()

    const { setopenmenu } = props
    const { state } = React.useContext(Auth)

    const { cart } = useCartContext()

    let hamburgerButton = (
        <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={props.toggleDrawer}
        >
            <MenuIcon />
        </IconButton>
    )

    let menuItem = null

    if (state.user.type === 'customer') {
        hamburgerButton = null
        menuItem = (
            <React.Fragment>
                <IconButton
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={() => {setopenmenu(true)}}
                >
                    <Badge
                        badgeContent={
                            cart.items.length > 0 ? cart.items.length : null
                        }
                        color="secondary"
                    >
                        <LocalGroceryStoreSharpIcon />
                    </Badge>
                </IconButton>
                <Notification />
            </React.Fragment>
        )
    }

    return (
        <div className={classes.grow}>
            <AppBar position="fixed">
                <Toolbar
                    variant="dense"
                    align="center"
                    className={classes.backgroundBlack}
                >
                    {hamburgerButton}
                    <div className={classes.grow} />
                    <AppLogo />
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>{menuItem}</div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default PrimarySearchAppBar
