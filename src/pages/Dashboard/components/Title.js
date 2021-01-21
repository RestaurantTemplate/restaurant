import { Container, makeStyles } from '@material-ui/core'
import { Label } from '../../../components/Label'

const useStyles = makeStyles({
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
})

export const Title = () => {
    const classes = useStyles()

    return (
        <Container
            align="center"
            maxWidth={false}
            className={classes.restaurantName}
        >
            <Label variant="h4" align="center" className={classes.title}>
                ชื่อร้านอาหาร
            </Label>
        </Container>
    )
}
