import * as React from 'react'
import { RestaurantName } from './components/RestaurantName'
import { Recommend } from './containers'

export const Dashboard = () => {
    return (
        <div>
            <RestaurantName />
            <Recommend />
        </div>
    )
}
