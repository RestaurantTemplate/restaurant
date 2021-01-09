import React, { useState } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Grid,
    Tab,
} from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import NotificationsIcon from '@material-ui/icons/Notifications'
import LocalGroceryStoreSharpIcon from '@material-ui/icons/LocalGroceryStoreSharp'
import { useStyles } from './../../css/css'
import './style.css'
function About() {
    const classes = useStyles()
    const [value, setValue] = useState('1')
    const [data] = useState('')
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <AppBar
                        className={classes.backgroundBlack}
                        position="static"
                    >
                        <Toolbar variant="dense">
                            <div className={classes.grow} />
                            <Typography
                                className={classes.paddingText}
                                variant="h6"
                                color="inherit"
                            >
                                EZ
                            </Typography>
                            <Typography
                                className={classes.backgroundAquamarine}
                                variant="h6"
                                color="inherit"
                            >
                                restaurant
                            </Typography>
                            <div className={classes.grow} />
                            <Typography
                                className={classes.paddingText}
                                variant="h6"
                                color="inherit"
                            >
                                {'รหัสร้าน:' + data.id}
                            </Typography>
                            <Typography
                                className={classes.paddingText}
                                variant="h6"
                                color="inherit"
                            >
                                {'โต๊ะที่:' + data.tableId}
                            </Typography>
                            <div className={classes.sectionDesktop}>
                                <IconButton
                                    aria-label="show 4 new mails"
                                    color="inherit"
                                >
                                    <Badge badgeContent={4} color="secondary">
                                        <LocalGroceryStoreSharpIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    <Badge badgeContent={17} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <br />
                    <Typography
                        align={'center'}
                        className={classes.paddingAllText}
                        variant="h5"
                    >
                        {data.name}
                    </Typography>
                </Grid>
                <Grid item xs={4} />
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
                        <TabPanel value="1">จานหลัก</TabPanel>
                        <TabPanel value="2">ทานเล่น</TabPanel>
                        <TabPanel value="3">ของหวาน</TabPanel>
                        <TabPanel value="4">เครื่องดื่ม</TabPanel>
                    </TabContext>
                </Grid>
                <Grid item xs={12}></Grid>
            </Grid>
        </div>
    )
}

export default About
