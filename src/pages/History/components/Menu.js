import { Container, Grid, makeStyles, Paper } from '@material-ui/core'
import Image from 'material-ui-image'
import { Label } from '../../../components/Label'
import kaphoa from '../../../Image/Kaphoa.jpg'

const imageStyle = {
    width: '120px',
    height: '120px',
    padding: 0,
    marginTop: '10px',
    marginBottom: '10px',
}

const useStyles = makeStyles({
    paper: { marginBottom: '20px', paddingLeft: '20px', paddingRight: '20px' },
})

export const Menu = ({ menu }) => {
    const { name, quantity } = menu
    const classes = useStyles()

    return (
        <Paper className={classes.paper} elevation={6}>
            <Grid container alignItems="center">
                <Grid item xs={2}>
                    <Image src={kaphoa} style={imageStyle} />
                </Grid>
                <Grid item xs={4}>
                    <Label>{name}</Label>
                </Grid>
                <Grid item xs={4}>
                    <Label>จำนวน {quantity} รายการ</Label>
                </Grid>
            </Grid>
        </Paper>
    )
}
