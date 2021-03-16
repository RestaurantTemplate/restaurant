import * as React from 'react'
import { Header } from '../../containers'
import { Recommend } from './containers'
import { SummaryReport } from './containers/SummaryReport'
import BaseLayout from '../../components/BaseLayout'

export const Dashboard = () => {
    return (
        <div>
            <BaseLayout>
                <Header />
                <Recommend />
                <SummaryReport />
            </BaseLayout>
        </div>
    )
}
