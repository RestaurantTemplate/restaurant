/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import SoldOut from './../../../Image/out-of-stock.png'
import { useCartContext } from '../../../context/cartContext'
import { Grid, TextField, Fab, Typography, Box, SvgIcon } from '@material-ui/core'
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
            width: '30px',
            height: '30px',
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
export const Menu = (props) => {
    const { fooditem } = props
    const [price, setprice] = useState(0)
    const [count, setcount] = useState(1)
    const classesLocal = useStyleslocal()

    const { cartAction } = useCartContext()

    useEffect(() => {
        if (count === undefined || count === null || count === '') {
            setprice(0)
        } else {
            setprice(fooditem.price * parseInt(count))
        }
    }, [count, fooditem.price])

    return (
        <>
        {
            fooditem.foodEnable ?
                <Grid
                    container
                    alignItems="center"
                    style={{ backgroundColor: '#e7e7e7' }}
                >
                    <Grid container xs={3}>
                        <Grid xs={1} />
                        <Grid xs={11} span={'1'}>
                            <img
                                src={fooditem.image_url}
                                style={{ width: '80%', heigt: '80%' }}
                                alt=""
                            />
                        </Grid>
                    </Grid>
                    <Grid container xs={3}>
                        <Typography className={classesLocal.Font}>
                            <b>{fooditem.name}</b>
                        </Typography>
                        <Typography
                            className={classesLocal.Font}
                            style={{ color: '#737373' }}
                        >
                            {fooditem.desc}
                        </Typography>
                    </Grid>
                    <Grid container xs={4}>
                        <Grid item style={{ display:'flex'}}>
                            <Typography
                                className={classesLocal.Font}
                                style={{ color: '#737373',paddingLeft:'10px',paddingRight:'5px'}}
                            >
                                {'ราคา'}
                            </Typography>
                            <Typography
                                className={classesLocal.Font}
                                style={{ color: '#737373' }}
                            >
                                {price + ' THB'}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify="right" alignItems="right" xs={2}>
                        <Box component="div">
                            <Fab
                                component="button"
                                justify="center"
                                alignItems="center"
                                size={'small'}
                                color="primary"
                                aria-label="add"
                                onClick={() =>
                                    cartAction.addToCart({
                                        id: fooditem.id,
                                        name: fooditem.name,
                                        amount: 1,
                                        price:  fooditem.price,
                                        totalPrice: fooditem.price
                                    })
                                }
                            >
                                <AddIcon />
                            </Fab>
                        </Box>
                    </Grid>
                </Grid>
                :                
                <Grid
                    container
                    alignItems="center"
                    style={{ backgroundColor: '#e7e7e7' }}
                >
                    <Grid container xs={3}>
                        <Grid xs={1} />
                        <Grid xs={11} span={'1'}>
                            <img
                                src={fooditem.image_url}
                                style={{ width: '80%', heigt: '80%' }}
                                alt=""
                            />
                        </Grid>
                    </Grid>
                    <Grid container xs={3}>
                        <Typography className={classesLocal.Font}>
                            <b>{fooditem.name}</b>
                        </Typography>
                        <Typography
                            className={classesLocal.Font}
                            style={{ color: '#737373' }}
                        >
                            {fooditem.desc}
                        </Typography>
                    </Grid>
                    <Grid container xs={4}  style={{ textAlign:"center"}}>
                        <Grid item style={{ display:'flex'}}>
                            <Typography
                                className={classesLocal.Font}
                                style={{ color: '#737373',paddingLeft:'10px',paddingRight:'5px'}}
                            >
                                {'ราคา'}
                            </Typography>
                            <Typography
                                className={classesLocal.Font}
                                style={{ color: '#737373' }}
                            >
                                {price + ' THB'}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify="right" alignItems="right" xs={2}>
                        <Box component="div" alignItems="center">
                            <img src={SoldOut} className={classesLocal.icons}/>
                        </Box>
                    </Grid>
                </Grid>
        }
        </>
    )
}
