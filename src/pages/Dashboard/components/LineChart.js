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

const generateData = () => {
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
    const monthlySales = [
        14009,
        29993,
        14444,
        224242,
        12345,
        6544,
        123434,
        434343,
        23424,
        3424324,
        75645,
        454545,
    ]
    return monthOfYears.map((m, i) => ({
        yAxis: monthlySales[i],
        xAxis: m,
    }))
}

export const LineChart = () => {
    const [chartData] = useState(generateData())

    const fetchHistoriesJan = () => {
        const start = '01/01/21 00:00:00'
        const end = '31/01/21 23:59:59'
        firebase
            .getHistories(start, end)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, ' => ', doc.data())
                })
            })
            .catch((error) => console.log('getHistories error', error.message))
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
