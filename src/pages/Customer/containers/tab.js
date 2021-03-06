/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import { TabContext,TabList,TabPanel } from '@material-ui/lab';
import {AppBar,Tab,Container,Paper} from '@material-ui/core';
import {Menu} from './../components';
import {useStyles} from './../../../css/css';
import Kaphoa from './../../../Image/Kaphoa.jpg';
import Padpedmupha from './../../../Image/padpedmupha.jpg';
import FrenchFries from './../../../Image/FrenchFries.jpg';
import Pop from './../../../Image/Pop.png';
import BingSu from './../../../Image/BingSu.jpg';
import Coke from './../../../Image/Coke.png';
export const Tabmenu = (props) =>{
    const {menu,setmenu} = props
    const classes = useStyles();
    const [fooditems,setfooditems] = useState([]);
    const [snacks,setsnacks] = useState([]);
    const [dessert,setdessert] = useState([]);
    const [drink,setdrink] = useState([]);
    const [value, setvalue] = useState('1');
    useEffect(() => {
        setfooditems([{image:Kaphoa,name:"ข้าวกระเพราหมูสับไข่ดาว",desc:"ข้าวกระเพราหมูสับอร่อยมาก",price:40},{image:Padpedmupha,name:"ข้าวราดผัดเผ็ดหมูป่า",desc:"หมูป่ากรึบๆ พร้อมข้าวสวยร้อนๆ",price:50}])
        setsnacks([{image:FrenchFries,name:"เฟรนซ์ฟรายส์",desc:"เลือกได้หลายรสชาติ",price:20},{image:Pop,name:"ไก่ป๊อป",desc:"เลือกได้หลายรสชาติ",price:30}])
        setdessert([{image:BingSu,name:"บิงซู",desc:"อร่อยหวาน ชื่นใจ",price:45}])
        setdrink([{image:Coke,name:"โค้ก",desc:"มีสองแบบทั้ง มีน้ำตาลและไม่มีน้ำตาล",price:15}])
    }, [])
    const handleChange = (e,newValue) => {
        setvalue(newValue)
    }
    return(
        <div>
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
                    <Container className={classes._root} maxWidth={'md'}>
                        <Paper style={{padding:'5%'}} elevation={4} >
                        {
                            fooditems.map((item)=>(
                                <>
                                    <Menu menu={menu} setmenu={setmenu} fooditem={item}/>
                                    <br/>
                                </>
                            ))
                        }
                        </Paper>
                    </Container>
                </TabPanel>
                <TabPanel value="2">
                    <Container className={classes._root} maxWidth={'md'}>
                        <Paper style={{padding:'5%'}} elevation={4} >
                        {
                            snacks.map((item)=>(
                                <>
                                    <Menu menu={menu} setmenu={setmenu} fooditem={item}/>
                                    <br/>
                                </>
                            ))
                        }
                        </Paper>
                    </Container>                    
                </TabPanel>
                <TabPanel value="3">
                    <Container className={classes._root} maxWidth={'md'}>
                        <Paper style={{padding:'5%'}} elevation={4} >
                        {
                            dessert.map((item)=>(
                                <>
                                    <Menu menu={menu} setmenu={setmenu} fooditem={item}/>
                                    <br/>
                                </>
                            ))
                        }
                        </Paper>
                    </Container>  
                </TabPanel>
                <TabPanel value="4">
                    <Container className={classes._root} maxWidth={'md'}>
                        <Paper style={{padding:'5%'}} elevation={4} >
                        {
                            drink.map((item)=>(
                                <>
                                    <Menu menu={menu} setmenu={setmenu} fooditem={item}/>
                                    <br/>
                                </>
                            ))
                        }
                        </Paper>
                    </Container> 
                </TabPanel>
            </TabContext>
        </div>
    );
}