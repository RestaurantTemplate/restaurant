import React, { useState,useEffect } from 'react'
import {
    AppBar,
    Typography,
    Grid,
    Tab,
    Paper,
    TextField,
    Fab,
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    Table,
    TableRow,
    Container,

} from '@material-ui/core';
import Kaphoa from './../../Image/Kaphoa.jpg';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import {DialogValue} from './components/dialog';
import { useStyles } from '../../css/css';
import {Layoutbar} from '../../components/LayoutBar';
import './style.css'
function About(props) {
    const classes = useStyles()
    const [link,setlink] = useState([]);
    const [list, setlist] = useState([])
    const [price, setprice] = useState(0)
    const [count, setcount] = useState(1)
    const [open,setopen] = useState(false)
    const [value, setValue] = useState('1')
    const [data, setdata] = useState('')
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const onClose = () =>{
        setopen(false)
    }
    useEffect(() => {
        if(count === undefined || count === null || count === ""){
            setprice(0)
        }
        else{
            setprice(40 * parseInt(count))            
        }
        setlink([{name:"Dashboard",path:"dashboard",icon:<DashboardIcon/>}])
    }, [count]);
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
            {console.log(data)}
            <>
                <Layoutbar isSidebar={true} topath={link} isNotification={true} setopenmenu={setopen} menu={list}>
                    <Container
                        className={classes.container}
                        disableGutters={true}
                        maxWidth={false}
                    >
                        <Container>
                            <Container
                                align="center"
                                maxWidth={false}
                                className={classes.restaurantName}
                            >
                                <Typography
                                    variant="h4"
                                    align="center"
                                    className={classes.title}
                                >
                                    ชื่อร้านอาหาร
                                </Typography>
                            </Container>
                            <Container className={classes.location}>
                                <LocationOnIcon color="disabled" />
                                <Typography variant="subtitle2">ที่อยู่ร้าน</Typography>
                            </Container>
                        </Container>
                    </Container>
                    <Grid item xs={12}>
                        <br />
                        <TabContext value={value}>
                            <AppBar position="static">
                                <TabList
                                    className={classes.backgroundGray}
                                    onChange={handleChange}
                                    variant={'fullWidth'}
                                    aria-label="simple tabs example"
                                >
                                    <Tab label="จานหลัก" value="1" />
                                    <Tab label="ทานเล่น" value="2" />
                                    <Tab label="ของหวาน" value="3" />
                                    <Tab label="เครื่องดื่ม" value="4" />
                                </TabList>
                            </AppBar>
                            <TabPanel value="1">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={2}/>
                                    <Grid item className={classes._root} xs={12} md={8}>
                                        <Paper style={{padding:'5%'}} elevation={4} >
                                            <Grid spacing={1} container justify="center" alignItems="center" style={{backgroundColor:'#e7e7e7'}} >
                                                <Grid style={{padding:'5%'}}  item md={3} xs={12} >
                                                    <img src={Kaphoa} style={{width:"100%",heigt:"100%"}} alt="" />
                                                </Grid>
                                                <Grid item md={3} xs={12}>
                                                    <h3>{"กระเพราหมูสับไข่ดาว"}</h3>
                                                    <p style={{color:'#737373'}}>{"กระเพราะเผ็ดมว๊ากกก"}</p>
                                                </Grid>
                                                <Grid container item md={3} xs={12}>
                                                    <Grid xs={6}>
                                                        <h3 style={{color:'#737373'}}>{"ราคา"}</h3>
                                                        <h3 style={{color:'#737373'}}>{"จำนวน"}</h3>                                                    
                                                    </Grid>
                                                    <Grid xs={6}>
                                                        <h3 style={{color:'#737373'}}>{price+" THB"}</h3>
                                                        <TextField size="small" variant="outlined" defaultValue={1} value={count} onChange={(e) => (/\d/).test(e.target.value) ? (setcount(e.target.value),console.log(e.target.value,(/\d/).test(e.target.value))) : (setcount(count),console.log(e.target.value)) } />                                                   
                                                    </Grid>
                                                </Grid>
                                                <Grid container justify="center" alignItems="center" md={3} xs={12}>
                                                    <Fab justify="center" alignItems="center" color="primary" aria-label="add" onClick={() => setlist([...list,{name:"กระเพราหมูสับไข่ดาว",price:price,count:count}])} >
                                                        <AddIcon />
                                                    </Fab>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={2}/>
                                </Grid>
                            </TabPanel>
                            <TabPanel value="2">ทานเล่น</TabPanel>
                            <TabPanel value="3">ของหวาน</TabPanel>
                            <TabPanel value="4">เครื่องดื่ม</TabPanel>
                        </TabContext>
                    </Grid>
                    <Grid item xs={12}></Grid>
                </Layoutbar>
            </>
            <DialogValue onClose={onClose} open={open}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>ชื่ออาหาร</TableCell>
                            <TableCell align="right">จำนวน</TableCell>
                            <TableCell align="right">ราคา</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {list.map((row,index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.count}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogValue>
        </div>
    )
}

export default About
