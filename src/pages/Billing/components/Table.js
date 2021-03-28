import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        padding: "10px",
        marginBottom: "20px"
    },
});

export default function Order(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Button variant="contained" disabled={props.customerId === '' } onClick={props.handleOpen}>{props.children}</Button>
        </Card>
    )
}
