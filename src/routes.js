// src/routes.js
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import App from './App'
import Customer from './pages/Customer'
import { Dashboard } from './pages/Dashboard'
import { History } from './pages/History'
import NotFound from './pages/NotFound'
import Orders from './pages/Orders/index'
import Queues from './pages/Queues/index'

const Routes = () => (
    <Switch>
        <Route exact path="/" component={App} />
        <Route path="/customer" component={Customer} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/history" component={History} />
        <Route path="/orders" component={Orders} />
        <Route path="/queues" component={Queues} />
        <Route path="*" component={NotFound} />
    </Switch>
)

export default Routes
