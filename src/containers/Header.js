import React from 'react'

import { Container, makeStyles, IconButton } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { Label } from '../components/Label'
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined'

import { Auth } from '../context/authContext'

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '250px',
        background: (props) => {
            if (props.type === 'manager') {
                return 'linear-gradient(rgba(186,226,255,0.76), rgba(186,226,255,0))'
            } else if (props.type === 'staff') {
                return 'linear-gradient(rgba(255, 129, 129, 0.76), rgba(255, 186, 186, 0))'
            } else if (props.type === 'customer') {
                return 'linear-gradient(rgba(63, 255, 93, 0.76), rgba(255, 186, 186, 0))'
            }
            else {
                return 'linear-gradient(180deg, rgba(217,220,255,1) 0%, rgba(255,255,255,0.7626400902157738) 100%)'
            }
        },
        // background: ({ background = 'blue' }) => {
        //     let gradient = ''
        //     switch (background) {
        //         case 'red':
        //             gradient =
        //                 'linear-gradient(rgba(255, 129, 129, 0.76), rgba(255, 186, 186, 0))'
        //             break
        //         case 'green':
        //             gradient =
        //                 'linear-gradient(rgba(63, 255, 93, 0.76), rgba(255, 186, 186, 0))'
        //             break
        //         case 'gray':
        //             gradient =
        //                 '#69697b'
        //             break
        //         case 'blueGradient':
        //             gradient =
        //                 'linear-gradient(180deg, rgba(217,220,255,1) 0%, rgba(255,255,255,0.7626400902157738) 100%)'
        //             break
        //         default:
        //             gradient =
        //                 'linear-gradient(rgba(186,226,255,0.76), rgba(186,226,255,0))'
        //             break
        //     }

        //     return gradient
        // },
        paddingTop: '100px',
    },
    restaurantName: {
        display: 'flex',
        justifyContenct: 'center',
        alignItems: 'center',
        width: '240px',
        height: '55px',
        background: '#ffffff',
        borderRadius: '20px',
        border: '1px solid rgba(164, 167, 255, 0.49)',
        justifyContent: 'center',
    },
    title: { color: '#8A88FF' },
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
            className={classes.container}
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
    const { title = 'ลงชื่อเข้าใช้' } = props
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
                <Label variant="h4" align="center" className={classes.title}>
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
