import * as React from 'react'
import { Container, Grid, makeStyles, Paper } from '@material-ui/core'
import { Label } from '../../../components/Label'
import { MenuList } from '../components'
import { DatePicker } from '../../../components'

const useStyles = makeStyles(() => ({
    container: {
        paddingTop: '20px',
        paddingBottom: '20px',
        marginBottom: '20px',
    },
    top: {
        marginBottom: '10px',
    },
}))

export const Detail = () => {
    const menuList = [
        { name: 'กระเพา', quantity: 2 },
        { name: 'หมูทอด', quantity: 5 },
        { name: 'ผัดผักรวม', quantity: 6 },
    ]

    const classes = useStyles()
    const [date, setDate] = React.useState(new Date())

    return (
        <Paper elevation={5} className={classes.container}>
            <Container>
                <Grid container justify="space-between" className={classes.top}>
                    <Grid item>
                        <Label variant="h4" paragraph>
                            ประวัติการขาย
                        </Label>
                    </Grid>

                    <Grid item>
                        <Grid item xs>
                            <DatePicker
                                label="กรุณาระบุวันที่ต้องการค้นหา"
                                selectedDate={date}
                                onDateChange={setDate}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <MenuList menuList={menuList} />
            </Container>
        </Paper>
    )
}
