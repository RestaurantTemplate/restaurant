/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import {
    AppBar,
    Tab,
    Container,
    Paper,
    Box,
    ListItemSecondaryAction,
} from '@material-ui/core'
import { Menu } from './../components'
import { useStyles } from './../../../css/css'

import firebase from '../../../firebase/config'

export const Tabmenu = (props) => {
    const classes = useStyles()
    const [mainDishes, setMainDishes] = useState([])
    const [appetizers, setAppetizers] = useState([])
    const [desserts, setDesserts] = useState([])
    const [drinks, setDrinks] = useState([])
    const [value, setvalue] = useState('1')

    const fetchMainDishes = () => {
        firebase.getMainDishes().then(function (querySnapshot) {
            let data = []
            querySnapshot.forEach(function (doc) {
                data.push({
                    id: doc.id,
                    ...doc.data(),
                })
            })
            setMainDishes(data)
        })
    }

    const fetchDesserts = () => {
        firebase.getDesserts().then(function (querySnapshot) {
            let data = []
            querySnapshot.forEach(function (doc) {
                data.push({
                    id: doc.id,
                    ...doc.data(),
                })
            })
            setDesserts(data)
        })
    }

    const fetchDrinks = () => {
        firebase.getDrinks().then(function (querySnapshot) {
            let data = []
            querySnapshot.forEach(function (doc) {
                data.push({
                    id: doc.id,
                    ...doc.data(),
                })
            })
            setDrinks(data)
        })
    }

    const fetchAppetizers = () => {
        firebase.getAppetizers().then(function (querySnapshot) {
            let data = []
            querySnapshot.forEach(function (doc) {
                data.push({
                    id: doc.id,
                    ...doc.data(),
                })
            })
            setAppetizers(data)
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
