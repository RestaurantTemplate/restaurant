import * as React from 'react'
import { Header } from '../../containers'
import { Recommend } from './containers'
import { SummaryReport } from './containers/SummaryReport'

export const Dashboard = () => {
    return (
        <div>
            <Header />
            <Recommend />
            <SummaryReport />
        </div>
    )
}
