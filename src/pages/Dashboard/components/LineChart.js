import { Animation, EventTracker } from '@devexpress/dx-react-chart'
import {
    ArgumentAxis,
    Chart,
    SplineSeries,
    Title,
    Tooltip,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui'
import { Paper } from '@material-ui/core'
import React, { useState, useEffect } from 'react'

import firebase from '../../../firebase/config'

const generateData = (monthlySales) => {
    const monthOfYears = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    // const monthlySales = [
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    // ]
    return monthOfYears.map((m, i) => ({
        yAxis: monthlySales[i],
        xAxis: m,
    }))
}

const monthlySales = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
]

export const LineChart = () => {
    const [chartData, setChartData] = useState(generateData(monthlySales))

    // const [monthlySales, setMonthlySales] = useState([])


    // const [jan, setJan] = useState(0)
    // const [feb, setFeb] = useState(0)
    // const [mar, setMar] = useState(0)
    // const [apr, setApr] = useState(0)
    // const [may, setMay] = useState(0)
    // const [jun, setJun] = useState(0)
    // const [jul, setJul] = useState(0)
    // const [aug, setAug] = useState(0)
    // const [sep, setSep] = useState(0)
    // const [oct, setOct] = useState(0)
    // const [nov, setNov] = useState(0)
    // const [dec, setDec] = useState(0)

    const fetchHistoriesJan = () => {
        // const start = '01/01/21 00:00:00'
        // const end = '31/01/21 23:59:59'
        // let janTotalPrice = 0
        // let febTotalPrice = 0
        // let marTotalPrice = 0
        // let aprTotalPrice = 0
        // let mayTotalPrice = 0
        // let junTotalPrice = 0
        // let julyTotalPrice = 0
        // let augTotalPrice = 0
        // let sepTotalPrice = 0
        // let octTotalPrice = 0
        // let novTotalPrice = 0
        // let decTotalPrice = 0
        // firebase
        //     .getHistories(start, end)
        //     .then((querySnapshot) => {
        //         querySnapshot.forEach((doc) => {
                    

        //             // doc.data() is never undefined for query doc snapshots
        //             console.log(doc.id, ' => ', doc.data())
        //         })
        //     })
        //     .catch((error) => console.log('getHistories error', error.message))

        firebase.getHistories().onSnapshot(
            (snapshot) => {
                let data = []
                snapshot.forEach((doc) => {
                    var source = doc.metadata.hasPendingWrites
                        ? 'Local'
                        : 'Server'
                    // console.log(source, ' data: ', doc.data())
                    if (source === 'Server') {
                        // data.push({
                        //     id: doc.id,
                        //     ...doc.data(),
                        // })
                        
                        // console.log('doc.data()',doc.data())

                        // console.log('monthlySales', monthlySales)
                        monthlySales[doc.data().month] += doc.data().totol_price

                        // console.log('data', data)

                    }
                })
                // setIsLoading(false)
                // setOrders(data)
                console.log('monthlySales', monthlySales)
                setChartData(generateData(monthlySales))
            },
            function (error) {
                console.log('Orders Error:', error.message)
                // setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchHistoriesJan()
    }, [])

    return (
        <Paper>
            <Chart data={chartData}>
                <ArgumentAxis />
                <ValueAxis />

                <SplineSeries
                    name="spline"
                    valueField="yAxis"
                    argumentField="xAxis"
                />
                <Title text="ยอดขายรายเดือน" />
                <Animation />
                <EventTracker />
                <Tooltip />
            </Chart>
        </Paper>
    )
}
