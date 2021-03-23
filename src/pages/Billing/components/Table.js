import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const useStyles = makeStyles({
    root: {
        padding: "10px",
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
            <Typography>{props.name}</Typography>
        </Card>
    )
}
