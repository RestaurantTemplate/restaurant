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
import { useState } from 'react'

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
