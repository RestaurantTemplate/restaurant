import React from 'react';
import { useStyles } from '../../css/css';
import {Tabmenu} from './containers';
import BaseLayout from '../../components/BaseLayout';
import './style.css';
function BranchStore(props) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <>
                <BaseLayout >
                    <Tabmenu />
                </BaseLayout>
            </>

        </div>
    )
}

export default BranchStore
