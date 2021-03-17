import React, { useState, useEffect } from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { useStyles } from '../../css/css'
import { Layoutbar } from '../../components/LayoutBar'
import { Header } from './../../containers'
import { Tabmenu, Dialoglist } from './containers'
import BaseLayout from '../../components/BaseLayout'
import './style.css'
function Customer(props) {
    const classes = useStyles()
    const [link, setlink] = useState([])
    const [list, setlist] = useState([])
    const [open, setopen] = useState(false)
    const [data, setdata] = useState('')
    useEffect(() => {
        setlink([
            { name: 'Dashboard', path: 'dashboard', icon: <DashboardIcon /> },
        ])
    }, [])
    useEffect(() => {
        try {
            let val = JSON.parse(
                new URLSearchParams(props.location.search)
                    .get('param')
                    .toString()
            )
            setdata(val)
        } catch (e) {
            console.log('no data')
        }
    }, [props.location])
    return (
        <div className={classes.root}>
            <>
                {console.log(data)}
                <Layoutbar isSidebar={true} topath={link} isNotification={true} setopenmenu={setopen} menu={list}>
                <BaseLayout>
                    <Header />
                    <Tabmenu menu={list} setmenu={setlist} />
                </BaseLayout>

                </Layoutbar>
            </>
            <Dialoglist
                open={open}
                setopen={setopen}
                list={list}
                setlist={setlist}
            />
        </div>
    )
}

export default Customer
