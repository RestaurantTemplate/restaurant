import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
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

export default function AppLogo() {
    const classes = useStyles()
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}
