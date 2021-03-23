// src/routes.js
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Customer from './pages/Customer'
import { Dashboard } from './pages/Dashboard'
import { History } from './pages/History'
import Billing from './pages/Billing/Billing'
import Orders from './pages/Orders/Orders'
import Queues from './pages/Queues/Queues'
import Menu from './pages/Menu/index'
// import Login from './pages/Login/index'
import Login from './pages/Auth/Login'

import { Auth } from './context/authContext'

const Routes = (props) => {
    const { state, dispatch } = React.useContext(Auth)

    // let routes = (
    //     <Switch>
    //         <Route path="/login" component={Login} exact />
    //         <Route path="/customer" component={Customer} />
    //         {/* <PrivateRoute exact path="/dashboard" component={Dashboard}/> */}
    //         <Route path="/dashboard" component={Dashboard} exact />
    //         <Route path="/history" component={History} />
    //         <Route path="/orders" component={Orders} />
    //         <Route path="/queues" component={Queues} />
    //         <Route path="/Menu" component={Menu} />
    //         <Redirect to="/login" />
    //     </Switch>
    // )

    let routes = (
        <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/login/:token" component={Login} />
            <Redirect to="/login" />
        </Switch>
    )

    if (state.user) {
        if (state.user.type === 'manager') {
            routes = (
                <Switch>
                    <Route path="/dashboard" component={Dashboard} exact />
                    <Route path="/history" component={History} />
                    <Route path="/Menu" component={Menu} />
                    <Redirect to="/dashboard" />
                </Switch>
            )
        } else if (state.user.type === 'staff') {
            routes = (
                <Switch>
                    <Route path="/orders" component={Orders} exact/>
                    <Route path="/queues" component={Queues} />
                    <Route path="/billing" component={Billing} exact/>
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
