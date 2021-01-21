import { Container, makeStyles } from '@material-ui/core'
import { Location, Title } from '../components'

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '300px',
        background:
            'linear-gradient(rgba(186,226,255,0.76), rgba(186,226,255,0))',
        paddingTop: '20px',
    },
})

export const Header = () => {
    const classes = useStyles()

    return (
        <Container
            className={classes.container}
            disableGutters={true}
            maxWidth={false}
        >
            <Title />
            <Location />
        </Container>
    )
}
