import React from 'react';
import { useStyles } from '../../css/css';
import {Tabmenu} from './containers';
import {withRouter} from 'react-router-dom';
import './style.css';
function BranchStore(props) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <>
                <Tabmenu {...props}/>
            </>

        </div>
    )
}

export default withRouter(BranchStore)
