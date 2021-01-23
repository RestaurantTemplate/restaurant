import { Container, makeStyles, Paper } from '@material-ui/core'
import { Label } from '../../../components/Label'
import { LineChart } from '../components'

const useStyles = makeStyles({
    container: { marginBottom: '20px' },
    paper: { padding: '20px' },
})

export const SummaryReport = () => {
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <Paper elevation={5} className={classes.paper}>
                <Label variant="h4" paragraph>
                    ยอดขายปีนี้
                </Label>
                <LineChart />
            </Paper>
        </Container>
    )
}
