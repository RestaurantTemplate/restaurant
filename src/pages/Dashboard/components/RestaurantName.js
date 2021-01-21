import { Container, Typography } from '@material-ui/core'
import * as React from 'react'
import { useRestaurantStyles } from '../useStyles'
import LocationOnIcon from '@material-ui/icons/LocationOn'

export const RestaurantName = () => {
    const classes = useRestaurantStyles()

    return (
        <Container
            className={classes.container}
            disableGutters={true}
            maxWidth={false}
        >
            <Container>
                <Container
                    align="center"
                    maxWidth={false}
                    className={classes.restaurantName}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        className={classes.title}
                    >
                        ชื่อร้านอาหาร
                    </Typography>
                </Container>
                <Container className={classes.location}>
                    <LocationOnIcon color="disabled" />
                    <Typography variant="subtitle2">ที่อยู่ร้าน</Typography>
                </Container>
            </Container>
        </Container>
    )
}
