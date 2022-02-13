/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState,useContext}  from 'react'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { Grid, Fab, Typography, Box, FormControlLabel, Switch } from '@material-ui/core'
import {removeMaindishes,editMaindishes} from './../../../firebase/maindishesFirebase';
import {removeAppetizers,editAppetizers} from './../../../firebase/appetizersFirebase';
import {removeDesserts,editDesserts} from './../../../firebase/dessertsFirebase';
import {removeDrinks,editDrinks} from './../../../firebase/drinksFirebase';
import {Auth} from './../../../context/authContext';
import {AlertDialog} from './../../../components';
import {DialoglistEdit} from './../containers'
const useStyleslocal = makeStyles((theme) => ({
    Font: {
        [theme.breakpoints.up('xs')]: {
            fontSize: '8px',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '15px',
        },
    },
    icons: {
        [theme.breakpoints.down('sm')]: {
            width: '20px',
            height: '20px',
        },
    },
    textStyle: {
        [theme.breakpoints.down('sm')]: {
            height: '20px',
            fontSize: '10px',
        },
    },
    textNopadding: {
        paddingLeft: '1px',
        paddingRight: '1px',
    },
    buttonStyle: {
        [theme.breakpoints.down('xs')]: {
            height: '20px',
            width: '20px',
            maxheight: '20px',
            maxwidth: '20px',
        },
    },
}))
export const List = (props) => {
    const { number,fooditem,setalert } = props
    const [open,setopen] = useState(false)
    const classesLocal = useStyleslocal()
    const {state} = useContext(Auth)
    const onDelete = () =>{
        if(number === "1"){
            removeMaindishes(state.user.branchstore,fooditem.id).then(function() {
                setalert(prevState =>({...prevState,open:true,text:'ลบสาขาสำเร็จ',colorNotify:'success'}));
            })
            .catch(function() {
                setalert(prevState =>({...prevState,open:true,text:'ลบสาขาไม่สำเร็จ',colorNotify:'error'}));
            });
        }
        else if(number === "2"){
            removeAppetizers(state.user.branchstore,fooditem.id).then(function() {
                setalert(prevState =>({...prevState,open:true,text:'ลบสาขาสำเร็จ',colorNotify:'success'}));
            })
            .catch(function() {
                setalert(prevState =>({...prevState,open:true,text:'ลบสาขาไม่สำเร็จ',colorNotify:'error'}));
            });
        }
        else if(number === "3"){
            removeDesserts(state.user.branchstore,fooditem.id).then(function() {
                setalert(prevState =>({...prevState,open:true,text:'ลบสาขาสำเร็จ',colorNotify:'success'}));
            })
            .catch(function() {
                setalert(prevState =>({...prevState,open:true,text:'ลบสาขาไม่สำเร็จ',colorNotify:'error'}));
            });
        }
        else if(number === "4"){
            removeDrinks(state.user.branchstore,fooditem.id).then(function() {
                setalert(prevState =>({...prevState,open:true,text:'ลบสาขาสำเร็จ',colorNotify:'success'}));
            })
            .catch(function() {
                setalert(prevState =>({...prevState,open:true,text:'ลบสาขาไม่สำเร็จ',colorNotify:'error'}));
            });
        }
    }
    const onChangeDisabledFood = () =>{
        if(number === "1"){
            let food = {
                name: fooditem.value.name,
                desc: fooditem.value.desc,
                foodEnable:!fooditem.value.foodEnable,
                image_url: fooditem.value.image_url,
                price: fooditem.value.price,
            }
            editMaindishes(food,state.user.branchstore,fooditem.id).then(function() {
                console.log('Success')
            })
            .catch(function(e) {
                console.log('UnSuccess:',e)
            });
        }
        else if(number === "2"){
            let food = {
                name: fooditem.value.name,
                desc: fooditem.value.desc,
                foodEnable:!fooditem.value.foodEnable,
                image_url: fooditem.value.image_url,
                price: fooditem.value.price,
            }
            editAppetizers(food,state.user.branchstore,fooditem.id).then(function() {
                console.log('Success')
            })
            .catch(function(e) {
                console.log('UnSuccess:',e)
            });
        }
        else if(number === "3"){
            let food = {
                name: fooditem.value.name,
                desc: fooditem.value.desc,
                foodEnable:!fooditem.value.foodEnable,
                image_url: fooditem.value.image_url,
                price: fooditem.value.price,
            }
            editDesserts(food,state.user.branchstore,fooditem.id).then(function() {
                console.log('Success')
            })
            .catch(function(e) {
                console.log('UnSuccess:',e)
            });
        }
        else if(number === "4"){
            let food = {
                name: fooditem.value.name,
                desc: fooditem.value.desc,
                foodEnable:!fooditem.value.foodEnable,
                image_url: fooditem.value.image_url,
                price: fooditem.value.price,
            }
            editDrinks(food,state.user.branchstore,fooditem.id).then(function() {
                console.log('Success')
            })
            .catch(function(e) {
                console.log('UnSuccess:',e)
            });
        }

    }
    return (
        <>
            <AlertDialog alert={alert} onClose={() => setalert({...alert,open:false})} />
            {/* <DialoglistEdit doc={fooditem} open={open} setopen={setopen} setalert={setalert}/> */}
            <Grid
                container
                alignItems="center"
                style={{ backgroundColor: '#e7e7e7' }}
            >
                <Grid container xs={3}>
                    <Grid xs={1} />
                    <Grid xs={11} span={'1'}>
                        <img
                            src={fooditem.value.image_url}
                            style={{ width: '80%', heigt: '80%' }}
                            alt=""
                        />
                    </Grid>
                </Grid>
                <Grid container xs={4}>
                    <Grid xs={12}>
                        <Typography className={classesLocal.Font}>
                            <b>{fooditem.value.name}</b>
                        </Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Typography
                            className={classesLocal.Font}
                            style={{ color: '#737373' }}
                        >
                            {fooditem.value.desc}
                        </Typography>                        
                    </Grid>

                </Grid>
                <Grid container xs={3}>
                    <Grid item xs={4}>
                        <Typography
                            className={classesLocal.Font}
                            style={{ color: '#737373' }}
                        >
                            {'ราคา'}
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography
                            className={classesLocal.Font}
                            style={{ color: '#737373' }}
                        >
                            {fooditem.value.price + ' THB'}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justify="right" alignItems="right" xs={2}>
                    {/* <Grid item xs={6}>
                        <Box component='div'>
                            <Fab  component="button"  justify="center" alignItems="center" size={'small'}  color="primary" aria-label="edit" onClick={() => setopen(true)}>
                                <EditIcon />
                            </Fab>
                        </Box>
                    </Grid> */}
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={<Switch checked={fooditem.value.foodEnable} onChange={onChangeDisabledFood} name="checkedA" />}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Box component='div'>
                            <Fab  component="button"  justify="center" alignItems="center" size={'small'}  color="secondary" aria-label="delete" onClick={onDelete}>
                                <DeleteIcon />
                            </Fab>
                        </Box>                        
                    </Grid>

                </Grid>
            </Grid>
        </>
    )
}
