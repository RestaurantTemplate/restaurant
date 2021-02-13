import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const useStyles = makeStyles({
    root: {
        marginBottom: "20px"
    },
    description: {
        padding: "5px",
        minHeight: "60px",
        border: "1px solid rgba(0, 0, 0, 0.7)",
        boxSizing: "border-box",
        borderRadius: "7px",
    },
    accept: {
        color: "green"
    },
    cancel: {
        color: "red"
    }
});

export default function Order(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Typography>โต๊ะที่ {props.tableNumber}</Typography>
                    <Typography>ออเดอร์ที่ {props.orderNumber}</Typography>
                    <IconButton  className={classes.accept}>
                        <CheckCircleOutlineIcon/>
                    </IconButton>
                    <IconButton  className={classes.cancel} onClick={props.orderRemoved}>
                        <CancelOutlinedIcon/>
                    </IconButton>
                </Grid>
                <Grid item xs={8}>
                    <Typography>รายละเอียด</Typography>
                    <Box className={classes.description}>{props.description}</Box>
                </Grid>
            </Grid>
        </Card>
    )
}
