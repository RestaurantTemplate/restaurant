// src/routes.js
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Customer from './pages/Customer'
import BranchStore from './pages/BranchStore'
import SelectBranchStore from './pages/SelectBranchStore'
import { Dashboard } from './pages/Dashboard'
import { History } from './pages/History'
import Billing from './pages/Billing/Billing'
import Orders from './pages/Orders/Orders'
import Queues from './pages/Queues/Queues'
import Menu from './pages/Menu/index'
// import Login from './pages/Login/index'
import Login from './pages/Auth/Login'
import OrderSummary from './pages/Billing/components/OrderSummary'

import { Auth } from './context/authContext'

const Routes = (props) => {
    const { state } = React.useContext(Auth)
    
    let routes = (
        <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/login/:token" component={Login} />
            <Redirect to="/login" />
        </Switch>
    )

    if (state.user) {
        if (state.user.type === 'manager') {
            if(state.user.branchstore !== ''){
                routes = (
                    <Switch>
                        <Route path="/branchstore" component={BranchStore} />
                        <Route path="/dashboard" component={Dashboard} exact />
                        <Route path="/history" component={History} />
                        <Route path="/Menu" component={Menu} />
                        <Redirect to="/dashboard" />
                    </Switch>
                )
            }
            else{
                routes = (
                    <Switch>
                        <Route path="/selectbranchstore" component={SelectBranchStore} />
                        <Redirect to="/selectbranchstore" />
                    </Switch>
                )
            }
        } else if (state.user.type === 'staff') {
            routes = (
                <Switch>
                    <Route path="/orders" component={Orders} exact/>
                    <Route path="/queues" component={Queues} />
                    <Route path="/billing" component={Billing} exact/>
                    <Route path="/billing/order_summary/:table_number/:id" component={OrderSummary} exact/>
                    <Redirect to="/orders" />
                </Switch>
            )
        } else if (state.user.type === 'customer') {
            routes = (
                <Switch>
                    <Route path="/customer" component={Customer} />
                    <Redirect to="/customer" />
                </Switch>
            )
        }
    }

    return routes
}

export default Routes
