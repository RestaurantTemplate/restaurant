/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import {
    AppBar,
    Tab,
    Container,
    Paper,
    Box,
    CircularProgress,
    Typography,
} from '@material-ui/core'
import { Menu } from './../components'
import { useStyles } from './../../../css/css'

import firebase from '../../../firebase/config'
import { Auth } from '../../../context/authContext'

export const Tabmenu = (props) => {
    const classes = useStyles()
    const [mainDishes, setMainDishes] = useState([])
    const [appetizers, setAppetizers] = useState([])
    const [desserts, setDesserts] = useState([])
    const [drinks, setDrinks] = useState([])
    const [value, setvalue] = useState('1')
    const [isLoading, setIsLoading] = useState(false)

    const { state, dispatch } = useContext(Auth)

    const logout = () => {
        console.log('props', props)
        firebase.logout()
        localStorage.clear()
        props.history.replace('/login')
        return dispatch({
            type: 'LOGOUT',
            payload: null,
        })
    }

    const fetchMainDishes = () => {
        setIsLoading(true)
        firebase
            .getMainDishes(state.user.branchstore)
            .then(function (querySnapshot) {
                let data = []
                querySnapshot.forEach(function (doc) {
                    data.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                })
                setIsLoading(false)
                setMainDishes(data)
            })
            .catch((error) => {
                console.log('[Tab] error message', error.message)
                // logout()
            })
    }

    const fetchDesserts = () => {
        firebase
            .getDesserts(state.user.branchstore)
            .then(function (querySnapshot) {
                let data = []
                querySnapshot.forEach(function (doc) {
                    data.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                })
                setDesserts(data)
            })
            .catch((error) => {
                console.log('[Tab] error message', error.message)
                // logout()
            })
    }

    const fetchDrinks = () => {
        firebase
            .getDrinks(state.user.branchstore)
            .then(function (querySnapshot) {
                let data = []
                querySnapshot.forEach(function (doc) {
                    data.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                })
                setDrinks(data)
            })
            .catch((error) => {
                console.log('[Tab] error message', error.message)
                // logout()
            })
    }

    const fetchAppetizers = () => {
        firebase
            .getAppetizers(state.user.branchstore)
            .then(function (querySnapshot) {
                let data = []
                querySnapshot.forEach(function (doc) {
                    data.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                })
                setAppetizers(data)
            })
            .catch((error) => {
                console.log('[Tab] error message', error.message)
                // logout()
            })
    }

    useEffect(() => {
        fetchMainDishes()
        fetchDesserts()
        fetchDrinks()
        fetchAppetizers()
    }, [])

    const handleChange = (e, newValue) => {
        setvalue(newValue)
    }

    let mainDishesItem = (
        <TabPanel value="1">
            <Container className={classes._root} maxWidth={'md'}>
                <Paper style={{ padding: '5%' }} elevation={4}>
                    {mainDishes.map((item, index) => (
                        <React.Fragment key={index}>
                            <Menu id={item.id} fooditem={item} />
                            <br />
                        </React.Fragment>
                    ))}
                </Paper>
            </Container>
        </TabPanel>
    )
    if (mainDishes.length === 0 && isLoading) {
        mainDishesItem = <CircularProgress />
    } else if (mainDishes.length === 0 && !isLoading) {
        mainDishesItem = (
            <Typography variant="h6">ไม่มีเมนูจานหลักในขณะนี้</Typography>
        )
    }

    // let appetizersItem = (
    //     <TabPanel value="2">
    //         <Container className={classes._root} maxWidth={'md'}>
    //             <Paper style={{ padding: '5%' }} elevation={4}>
    //                 {appetizers.map((item, index) => (
    //                     <React.Fragment key={index}>
    //                         <Menu id={item.id} fooditem={item} />
    //                         <br />
    //                     </React.Fragment>
    //                 ))}
    //             </Paper>
    //         </Container>
    //     </TabPanel>
    // )
    // if (appetizers.length === 0 && isLoading) {
    //     appetizersItem = <CircularProgress />
    // } else if (appetizers.length === 0) {
    //     appetizersItem = (
    //         <Typography variant="h6">ไม่มีเมนูทานเล่นในขณะนี้</Typography>
    //     )
    // }

    return (
        <Box display={{ xs: 'block', md: 'block' }}>
            <Box component="div">
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
                    {mainDishesItem}
                    <TabPanel value="2">
                        <Container className={classes._root} maxWidth={'md'}>
                            <Paper style={{ padding: '5%' }} elevation={4}>
                                {appetizers.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <Menu id={item.id} fooditem={item} />
                                        <br />
                                    </React.Fragment>
                                ))}
                            </Paper>
                        </Container>
                    </TabPanel>
                    <TabPanel value="3">
                        <Container className={classes._root} maxWidth={'md'}>
                            <Paper style={{ padding: '5%' }} elevation={4}>
                                {desserts.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <Menu id={item.id} fooditem={item} />
                                        <br />
                                    </React.Fragment>
                                ))}
                            </Paper>
                        </Container>
                    </TabPanel>
                    <TabPanel value="4">
                        <Container className={classes._root} maxWidth={'md'}>
                            <Paper style={{ padding: '5%' }} elevation={4}>
                                {drinks.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <Menu id={item.id} fooditem={item} />
                                        <br />
                                    </React.Fragment>
                                ))}
                            </Paper>
                        </Container>
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    )
}
