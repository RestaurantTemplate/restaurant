import { Container, makeStyles, Paper } from '@material-ui/core'
import { ItemList, TextRecommend } from '../components'

const useStyles = makeStyles({
    container: { marginBottom: '50px' },

    paper: { padding: '20px' },
})

export const Recommend = () => {
    const classes = useStyles()
    const mockItem = {
        imgUrl: '',
        name: 'กระเพราไก่',
        quantity: 2,
    }
    const recommends = [mockItem, mockItem, mockItem]

    return (
        <Container className={classes.container}>
            <Paper elevation={5} className={classes.paper}>
                <TextRecommend />
                <ItemList items={recommends} />
            </Paper>
        </Container>
    )
}
