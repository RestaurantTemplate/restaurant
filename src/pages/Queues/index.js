import React from 'react'

import { Header } from '../../containers/index'
import BaseLayout from '../../components/BaseLayout'
import Queues from './Queues'

export default function Layout() {
    return (
        <React.Fragment>
            <BaseLayout>
                <Header background="red" />
                <Queues />
            </BaseLayout>
        </React.Fragment>
    )
}
