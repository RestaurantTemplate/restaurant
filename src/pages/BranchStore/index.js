import React, { useState,useEffect } from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useStyles } from '../../css/css';
import {Layoutbar} from '../../components/LayoutBar';
import {Header} from '../../containers'
import {Tabmenu,Dialoglist} from './containers';
import './style.css'
function BranchStore(props) {
    const classes = useStyles()
    const [link,setlink] = useState([]);
    const [list, setlist] = useState([])
    const [data, setdata] = useState('')
    useEffect(() => {
        setlink([{name:"Dashboard",path:"dashboard",icon:<DashboardIcon/>}])
    }, []);
    useEffect(() => {
        try{
            let val = JSON.parse(new URLSearchParams(props.location.search).get("param").toString())
            setdata(val);
        }
        catch(e){
            console.log('no data')
        }
    }, [props.location])
    return (
        <div className={classes.root}>
            <>
                {console.log(data)}
                {/* <Layoutbar isSidebar={true} topath={link}  menu={list}> */}
                    <Header />
                    <Tabmenu menu={list} setmenu={setlist} />
                {/* </Layoutbar> */}
            </>

        </div>
    )
}

export default BranchStore
