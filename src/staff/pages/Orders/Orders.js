import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Order from '../../components/Order/Order'

const useStyles = makeStyles({
  root: {
  }
})

export default function Orders() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      ออเดอร์
      <Order />
      <Order />
      <Order />
      <Order />
    </div>
  )
}
