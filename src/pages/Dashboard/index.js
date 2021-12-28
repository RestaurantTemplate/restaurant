import * as React from 'react'
import { Recommend } from './containers'
import { SummaryReport } from './containers/SummaryReport'

export const Dashboard = () => {
    return (
        <>
            <Recommend />
            <SummaryReport />
        </>
    )
}
