/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid, makeStyles } from '@material-ui/core'
import { Label } from '../../../components/Label'

const useStyles = makeStyles({
    container: { marginTop: '10px', marginBottom: '10px' },
    image: {
        width: '200px',
        height: '150px',
        backgroundColor: 'gray',
    },
    textAlign: { alignSelf: 'center' },
})

export const Item = (props) => {
    const {
        item: { name, quantity, imgUrl },
    } = props
    const classes = useStyles()

    return (
        <Grid container spacing={2} className={classes.container}>
            {console.log('imgUrl:',imgUrl)}
            {
                imgUrl === '' || imgUrl === undefined ?
                    <Grid item xs={4} style={{paddingLeft:'10px'}}>
                        <Box className={classes.image} />
                    </Grid>
                    :
                    <Grid item xs={4} style={{paddingLeft:'10px'}}>
                        <Box >
                            <img src={imgUrl} width={'200px'} height={classes.image.height}/>
                        </Box>
                    </Grid>
            }
            <Grid item xs={3} className={classes.textAlign}>
                <Label variant="h5">{name}</Label>
            </Grid>
            <Grid item xs={3} className={classes.textAlign}>
                <Label variant="h5">{quantity} รายการ</Label>
            </Grid>
        </Grid>
    )
}
