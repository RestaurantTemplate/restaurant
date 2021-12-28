import React, { useState,useEffect } from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useStyles } from '../../css/css';
import {Tabmenu,Dialoglist} from './containers';
import MaindishProvider from './../../context/maindishesContext';
import './style.css'
function Menues(props) {
    const classes = useStyles()
    const [list, setlist] = useState([])
    return (
        <div className={classes.root}>
            <MaindishProvider>
                <Tabmenu menu={list} setmenu={setlist} />
            </MaindishProvider>

        </div>
    )
}

export default Menues
