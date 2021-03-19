import * as React from 'react'
import { Recommend } from './containers'
import { SummaryReport } from './containers/SummaryReport'
import BaseLayout from '../../components/BaseLayout'

export const Dashboard = () => {
    return (
        <BaseLayout>
            <Recommend />
            <SummaryReport />
        </BaseLayout>
    )
}
