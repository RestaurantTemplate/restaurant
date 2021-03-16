import React from 'react'

import { Header } from '../../containers/index'
import BaseLayout from '../../components/BaseLayout'
import Orders from './Orders'

export default function Layout() {
    return (
        <React.Fragment>
            <BaseLayout>
                <Header background="red" />
                <Orders />
            </BaseLayout>
        </React.Fragment>
    )
}
