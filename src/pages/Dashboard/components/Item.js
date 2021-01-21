import { Box, Grid, makeStyles } from '@material-ui/core'
import { Label } from '../../../components/Label'

const useStyles = makeStyles({
    container: { marginTop: '10px', marginBottom: '10px' },
    image: {
        width: '100%',
        height: '150px',
        backgroundColor: 'gray',
    },
    textAlign: { alignSelf: 'center' },
})

export const Item = (props) => {
    const {
        item: { name, quantity },
    } = props
    const classes = useStyles()

    return (
        <Grid container spacing={2} className={classes.container}>
            <Grid item xs={2}>
                <Box className={classes.image} />
            </Grid>
            <Grid item xs={3} className={classes.textAlign}>
                <Label variant="h5">{name}</Label>
            </Grid>
            <Grid item xs={3} className={classes.textAlign}>
                <Label variant="h5">{quantity} รายการ</Label>
            </Grid>
        </Grid>
    )
}
