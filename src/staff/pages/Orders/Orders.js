import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Order from '../../components/Order/Order'

const useStyles = makeStyles({
  root: {
  }
})

export default function Orders() {
  const classes = useStyles();

  const dataDummy = {
    orders: [
      {
        orderNumber: "00000001",
        tableNumber: "1",
        description: "เมนูกับข้าวยอดนิยมอย่างผัดเปรี้ยวหวานกินได้ทั้งเด็กและผู้ใหญ่ ไปร้านข้าวแกงเจ้าไหนก็มีขาย ใครสนใจแนะนำเมนูผัดเปรี้ยวหวานหมู จานนี้ครบทั้งผักและผลไม้ ราดข้าวสวยร้อน ๆ อร่อยฟิน !"
      },
      {
        orderNumber: "00000001",
        tableNumber: "2",
        description: "เมนูกับข้าวยอดนิยมอย่างผัดเปรี้ยวหวานกินได้ทั้งเด็กและผู้ใหญ่ ไปร้านข้าวแกงเจ้าไหนก็มีขาย ใครสนใจแนะนำเมนูผัดเปรี้ยวหวานหมู จานนี้ครบทั้งผักและผลไม้ ราดข้าวสวยร้อน ๆ อร่อยฟิน !"
      },
      {
        orderNumber: "00000001",
        tableNumber: "3",
        description: "เมนูกับข้าวยอดนิยมอย่างผัดเปรี้ยวหวานกินได้ทั้งเด็กและผู้ใหญ่ ไปร้านข้าวแกงเจ้าไหนก็มีขาย ใครสนใจแนะนำเมนูผัดเปรี้ยวหวานหมู จานนี้ครบทั้งผักและผลไม้ ราดข้าวสวยร้อน ๆ อร่อยฟิน !"
      },
      {
        orderNumber: "00000001",
        tableNumber: "4",
        description: "เมนูกับข้าวยอดนิยมอย่างผัดเปรี้ยวหวานกินได้ทั้งเด็กและผู้ใหญ่ ไปร้านข้าวแกงเจ้าไหนก็มีขาย ใครสนใจแนะนำเมนูผัดเปรี้ยวหวานหมู จานนี้ครบทั้งผักและผลไม้ ราดข้าวสวยร้อน ๆ อร่อยฟิน !"
      },
      {
        orderNumber: "00000001",
        tableNumber: "5",
        description: "เมนูกับข้าวยอดนิยมอย่างผัดเปรี้ยวหวานกินได้ทั้งเด็กและผู้ใหญ่ ไปร้านข้าวแกงเจ้าไหนก็มีขาย ใครสนใจแนะนำเมนูผัดเปรี้ยวหวานหมู จานนี้ครบทั้งผักและผลไม้ ราดข้าวสวยร้อน ๆ อร่อยฟิน !"
      }

    ]
  }

  const orders = dataDummy.orders.map((order) => (
    <Order
      tableNumber={order.tableNumber}
      orderNumber={order.orderNumber}
      description={order.description} />
  ))

  return (
    <div className={classes.root}>
      ออเดอร์
      {orders}
    </div>
  )
}
