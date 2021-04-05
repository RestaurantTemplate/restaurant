import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import { useCartContext } from '../../../context/cartContext'
import { Grid, TextField, Fab, Typography, Box } from '@material-ui/core'
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
export const Menu = (props) => {
    const { fooditem } = props
    const classesLocal = useStyleslocal()

    return (
        <>
            <Grid
                container
                alignItems="center"
                style={{ backgroundColor: '#e7e7e7' }}
            >
                <Grid container xs={3}>
                    <Grid xs={1} />
                    <Grid xs={11} span={'1'}>
                        <img
                            // src={fooditem.image_url}
                            style={{ width: '80%', heigt: '80%' }}
                            alt=""
                        />
                    </Grid>
                </Grid>
                <Grid container xs={5}>
                    <Typography className={classesLocal.Font}>
                        <b>{"ชื่อเมนู"}</b>
                    </Typography>
                </Grid>
                <Grid container xs={4}>
                    <Grid item xs={12}>
                        <Typography
                            className={classesLocal.Font}
                            style={{ color: '#737373' }}
                        >
                            {'จำนวน'}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
