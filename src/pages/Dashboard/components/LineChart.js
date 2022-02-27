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
import React, { useState, useEffect, useContext } from 'react'
import {Auth} from '../../../context/authContext';

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
    const {state} = useContext(Auth);

    const fetchHistoriesJan = () => {


        firebase.getHistories(state.user.branchstore).onSnapshot(
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

                        console.log('monthlySales', doc.data())
                        monthlySales[doc.data().month] += doc.data().totol_price

                        // console.log('data', data)

                    }
                })
                // setIsLoading(false)
                // setOrders(data)
                // console.log('monthlySales', monthlySales)
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
