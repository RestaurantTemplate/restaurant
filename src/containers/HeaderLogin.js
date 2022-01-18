import React from 'react'

import { Container, makeStyles, IconButton } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { Label } from '../components/Label'
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined'

import { Auth } from '../context/authContext'

const useStyles = makeStyles({
    restaurantName: {
        display: 'flex',
        justifyContenct: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: '55px',
        background: '#ffffff',
    },
    title: { color: '#000000' },
    location: {
        width: '135px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '9px',
    },
    largeIcon: {
        width: 260,
        height: 260,
    },
})

export const Header = (props) => {
    const { title = 'ชื่อร้านอาหาร' } = props

    const { state, dispatch } = React.useContext(Auth)

    const classes = useStyles(state.user)

    return (
        <Container
            disableGutters={true}
            maxWidth={false}
        >
            <Container
                align="center"
                maxWidth={false}
                className={classes.restaurantName}
            >
                <Label variant="h4" align="center" className={classes.title}>
                    {title}
                </Label>
            </Container>
            <Container className={classes.location}>
                <LocationOnIcon color="disabled" />
                <Label variant="subtitle2">ที่อยู่ร้าน</Label>
            </Container>
        </Container>
    )
}
export const HeaderLogin = (props) => {
    const { title = 'Sign In' } = props
    const classes = useStyles(props)

    return (
        <Container
            className={classes.container}
            disableGutters={true}
            maxWidth={false}
        >
            <Container
                align="center"
                maxWidth={false}
                className={classes.restaurantName}
            >
                <Label variant="h5" align="center" className={classes.title}>
                    {title}
                </Label>
            </Container>
        </Container>
    )
}
export const HeaderLoginChildren = (props) => {
    const classes = useStyles(props)

    return (
        <Container
            className={classes.container}
            disableGutters={true}
            maxWidth={false}
        >
            <Container align="center" maxWidth={false}>
                <AccountBoxOutlinedIcon style={{ fontSize: 100 }} />
            </Container>
        </Container>
    )
}

