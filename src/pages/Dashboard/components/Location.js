import { Container, makeStyles } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { Label } from '../../../components/Label'

const useStyles = makeStyles({
    location: {
        width: '135px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '9px',
    },
})

export const Location = () => {
    const classes = useStyles()

    return (
        <Container className={classes.location}>
            <LocationOnIcon color="disabled" />
            <Label variant="subtitle2">ที่อยู่ร้าน</Label>
        </Container>
    )
}
