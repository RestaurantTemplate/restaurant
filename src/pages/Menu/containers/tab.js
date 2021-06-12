/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useMemo,useContext} from 'react'
import { TabContext,TabList,TabPanel } from '@material-ui/lab';
import {AppBar,Tab,Container,Paper,Box,CircularProgress } from '@material-ui/core';
import {Menu,List} from './../components';
import {Dialoglist} from './dialog';
import {useStyles} from './../../../css/css';
import {Auth} from './../../../context/authContext'; 
import {getAllMaindishes} from './../../../firebase/maindishesFirebase';
import {getAllAppetizers} from './../../../firebase/appetizersFirebase';
import {getAllDesserts} from './../../../firebase/dessertsFirebase';
import {getAllDrinks} from './../../../firebase/drinksFirebase';
import {AlertDialog} from './../../../components';
export const Tabmenu = (props) =>{
    const {menu,setmenu} = props
    const [loading,setloading] = useState(true)
    const classes = useStyles();
    const {state} = useContext(Auth);
    const [value, setvalue] = useState('1');
    const [open,setopen] = useState(false);
    const [listMain,setlistMain]  = useState([]);
    const [listAppetizers,setlistAppetizers]  = useState([]);
    const [listDessert,setlistDessert]  = useState([]);
    const [listDrinks,setlistDrinks]  = useState([]);
    const initialAlert = {
        open:false,
        text:'',
        colorNotify:''
    }
    const [alert,setalert] = useState(initialAlert);
    useMemo(() => {
        if(value === "1"){
            setloading(true)
            getAllMaindishes(state.user.branchstore).onSnapshot(function(querySnapshot) {
                var cities = [];
                querySnapshot.forEach(function(doc) {
                    cities.push({id:doc.id,value:doc.data()});
                });
                console.log('Current MainDishes :',cities)
                setlistMain(cities)
                setloading(false)
            },function (error) {
                console.log('MainDishes Error:', error.message)
                setloading(false)
            });
        }
        else if(value === "2"){
            setloading(true)
            getAllAppetizers(state.user.branchstore).onSnapshot(function(querySnapshot) {
                var cities = [];
                querySnapshot.forEach(function(doc) {
                    cities.push({id:doc.id,value:doc.data()});
                });
                console.log('Current Appetizers :',cities)
                setlistAppetizers(cities)
                setloading(false)
            },function (error) {
                console.log('Appetizers Error:', error.message)
                setloading(false)
            });            
        }
        else if(value === "3"){
            setloading(true)
            getAllDesserts(state.user.branchstore).onSnapshot(function(querySnapshot) {
                var cities = [];
                querySnapshot.forEach(function(doc) {
                    cities.push({id:doc.id,value:doc.data()});
                });
                console.log('Current Appetizers :',cities)
                setlistDessert(cities)
                setloading(false)
            },function (error) {
                console.log('Appetizers Error:', error.message)
                setloading(false)
            });            
        }
        else if(value === "4"){
            setloading(true)
            getAllDrinks(state.user.branchstore).onSnapshot(function(querySnapshot) {
                var cities = [];
                querySnapshot.forEach(function(doc) {
                    cities.push({id:doc.id,value:doc.data()});
                });
                console.log('Current Appetizers :',cities)
                setlistDrinks(cities)
                setloading(false)
            },function (error) {
                console.log('Appetizers Error:', error.message)
                setloading(false)
            });            
        }
    }, [value])
    const ShowMainData = () =>{
        return (
            value === "1" ?
                loading === false ?
                    listMain.map((doc)=>{
                        return <><List number={value} setopen={setopen} setalert={setalert} fooditem={doc}/><br/></>
                    })
                    :<CircularProgress />
                :value === "2" ?
                    loading === false ?
                        listAppetizers.map((doc)=>{
                            return <><List number={value} setopen={setopen} setalert={setalert} fooditem={doc}/><br/></>
                        })
                        :<CircularProgress />
                    :value === "3" ?
                        loading === false ?
                            listDessert.map((doc)=>{
                                return <><List number={value} setopen={setopen} setalert={setalert} fooditem={doc}/><br/></>
                            })
                            :<CircularProgress />
                        :value === "4" ?
                            loading === false ?
                                listDrinks.map((doc)=>{
                                    return <><List number={value} setopen={setopen} setalert={setalert} fooditem={doc}/><br/></>
                                })
                                :<CircularProgress />
                            :<></>
        );
    }
    
    const handleChange = (e,newValue) => {
        setvalue(newValue)
    }
    return(
        <Box display={{ xs: 'block', md: 'block' }}>
            <AlertDialog  alert={alert} onClose={() => setalert({...alert,open:false})} />
            <Dialoglist number={value} alert={alert} setalert={setalert} open={open} setopen={setopen}/>
            <Box component="div" >
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
                        <Container maxWidth={'md'}>
                            <Paper style={{padding:'5%'}} elevation={4} >
                                {
                                    <Menu  setopen={setopen}/>
                                }
                                <br/>
                                <ShowMainData  />
                            </Paper>
                        </Container>
                    </TabPanel>
                    <TabPanel value="2">
                        <Container maxWidth={'md'}>
                            <Paper style={{padding:'5%'}} elevation={4} >
                                {
                                    <Menu  setopen={setopen}/>
                                }
                                <br/>
                                <ShowMainData/>
                            </Paper>
                        </Container>                    
                    </TabPanel>
                    <TabPanel value="3">
                        <Container maxWidth={'md'}>
                            <Paper style={{padding:'5%'}} elevation={4} >
                                {
                                    <Menu  setopen={setopen}/>
                                }
                                <br/>
                                <ShowMainData/>
                            </Paper>
                        </Container>  
                    </TabPanel>
                    <TabPanel value="4">
                        <Container maxWidth={'md'}>
                            <Paper style={{padding:'5%'}} elevation={4} >
                                {
                                    <Menu  setopen={setopen}/>
                                }
                                <br/>
                                <ShowMainData/>
                            </Paper>
                        </Container> 
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    );
}