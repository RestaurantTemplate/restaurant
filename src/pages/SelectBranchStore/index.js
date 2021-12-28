import React from 'react';
import { useStyles } from '../../css/css';
import {Tabmenu} from './containers';
import './style.css';
function BranchStore(props) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Tabmenu />
        </div>
    )
}

export default BranchStore
