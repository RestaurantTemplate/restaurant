import { Container, makeStyles } from '@material-ui/core'
import { Label } from '../../../components/Label'

const useStyles = makeStyles({
    textRecommend: {
        textDecoration: 'underline',
    },
})

export const TextRecommend = () => {
    const classes = useStyles()

    return (
        <Container>
            <Label variant="h4" className={classes.textRecommend}>
                สินค้าขายดี
            </Label>
        </Container>
    )
}
