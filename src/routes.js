// src/routes.js
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Customer from './pages/Customer'
import BranchStore from './pages/BranchStore'
import { Dashboard } from './pages/Dashboard'
import { History } from './pages/History'
import Orders from './pages/Orders/index'
import Queues from './pages/Queues/index'
import Menu from './pages/Menu/index'
// import Login from './pages/Login/index'
import Login from './pages/Auth/index'
import PrivateRoute from './PrivateRoute'

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
            <Redirect to="/login" />
        </Switch>
    )

    if (state.user) {
        console.log('[Route] user', state.user)
        if (state.user.type === 'manager') {
            routes = (
                <Switch>
                    <Route path="/branchstore" component={BranchStore} />
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
