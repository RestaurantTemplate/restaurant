// src/routes.js
import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import App from './App'
import Customer from './pages/Customer'
import { Dashboard } from './pages/Dashboard'
import { History } from './pages/History'
import NotFound from './pages/NotFound'
import Orders from './pages/Orders/index'
import Queues from './pages/Queues/index'
import Login from './pages/Login/index'
import Menus from './pages/Menu'

const Routes = () => {
    let isAuthenticated = true

    let routes = (
        <Switch>
            <Route path="/login" component={Login} exact />
            <Redirect to="/login" />
        </Switch>
    )

    if (isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/customer" component={Customer} />
                <Route path="/dashboard" component={Dashboard} exact />
                <Route path="/history" component={History} />
                <Route path="/orders" component={Orders} />
                <Route path="/queues" component={Queues} />
                <Redirect to="/dashboard" />
            </Switch>
        )
    }

    return <Router>{routes}</Router>
    // <Switch>
    //     <Route exact path="/" component={App} />
    //     <Route path="/login" component={Login} />
    //     <Route path="/customer" component={Customer} />
    //     <Route path="/dashboard" component={Dashboard} />
    //     <Route path="/history" component={History} />
    //     <Route path="/orders" component={Orders} />
    //     <Route path="/queues" component={Queues} />
    //     <Route path="*" component={NotFound} />
    // </Switch>
}

export default Routes
