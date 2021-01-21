// src/routes.js
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import App from './App'
import Customer from './pages/Customer'
import { Dashboard } from './pages/Dashboard'
import NotFound from './pages/NotFound'

const Routes = () => (
    <Switch>
        <Route exact path="/" component={App} />
        <Route path="/customer" component={Customer} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="*" component={NotFound} />
    </Switch>
)

export default Routes
