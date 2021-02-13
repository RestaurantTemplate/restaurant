import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Order from '../../components/Order/Order'

const useStyles = makeStyles({
  root: {
  }
})

const ordersData = [
  {
    orderNumber: "00000001",
    tableNumber: "1",
    description: "เมนูกับข้าวยอดนิยมอย่างผัดเปรี้ยวหวานกินได้ทั้งเด็กและผู้ใหญ่ ไปร้านข้าวแกงเจ้าไหนก็มีขาย ใครสนใจแนะนำเมนูผัดเปรี้ยวหวานหมู จานนี้ครบทั้งผักและผลไม้ ราดข้าวสวยร้อน ๆ อร่อยฟิน !"
  },
  {
    orderNumber: "00000002",
    tableNumber: "2",
    description: "เมนูกับข้าวยอดนิยมอย่างผัดเปรี้ยวหวานกินได้ทั้งเด็กและผู้ใหญ่ ไปร้านข้าวแกงเจ้าไหนก็มีขาย ใครสนใจแนะนำเมนูผัดเปรี้ยวหวานหมู จานนี้ครบทั้งผักและผลไม้ ราดข้าวสวยร้อน ๆ อร่อยฟิน !"
  },
  {
    orderNumber: "00000003",
    tableNumber: "3",
    description: "เมนูกับข้าวยอดนิยมอย่างผัดเปรี้ยวหวานกินได้ทั้งเด็กและผู้ใหญ่ ไปร้านข้าวแกงเจ้าไหนก็มีขาย ใครสนใจแนะนำเมนูผัดเปรี้ยวหวานหมู จานนี้ครบทั้งผักและผลไม้ ราดข้าวสวยร้อน ๆ อร่อยฟิน !"
  },
  {
    orderNumber: "00000004",
    tableNumber: "4",
    description: "เมนูกับข้าวยอดนิยมอย่างผัดเปรี้ยวหวานกินได้ทั้งเด็กและผู้ใหญ่ ไปร้านข้าวแกงเจ้าไหนก็มีขาย ใครสนใจแนะนำเมนูผัดเปรี้ยวหวานหมู จานนี้ครบทั้งผักและผลไม้ ราดข้าวสวยร้อน ๆ อร่อยฟิน !"
  },
  {
    orderNumber: "00000005",
    tableNumber: "5",
    description: "เมนูกับข้าวยอดนิยมอย่างผัดเปรี้ยวหวานกินได้ทั้งเด็กและผู้ใหญ่ ไปร้านข้าวแกงเจ้าไหนก็มีขาย ใครสนใจแนะนำเมนูผัดเปรี้ยวหวานหมู จานนี้ครบทั้งผักและผลไม้ ราดข้าวสวยร้อน ๆ อร่อยฟิน !"
  }
]

export default function Orders() {
  const [orders, setOrders] = useState(ordersData)

  const classes = useStyles();

  const addOrderHandler = () => {

  }

  const removeOrderHandler = (orderNumber) => {
    const updatedOrders = orders.filter(order => orderNumber !== order.orderNumber)
    setOrders(updatedOrders)
    console.log("remove order")
  }

  const orderItems = orders.map((order) => (
    <Order
      key={order.orderNumber}
      tableNumber={order.tableNumber}
      orderNumber={order.orderNumber}
      description={order.description}
      orderRemoved={()=>removeOrderHandler(order.orderNumber)} />
  ))

  return (
    <div className={classes.root}>
      ออเดอร์
      {orderItems}
    </div>
  )
}
