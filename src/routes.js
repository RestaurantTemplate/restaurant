// src/routes.js
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import App from './App'
import About from './pages/About'
import { Dashboard } from './pages/Dashboard'
import NotFound from './pages/NotFound'

const Routes = () => (
    <Switch>
        <Route exact path="/" component={App} />
        <Route path="/about" component={About} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="*" component={NotFound} />
    </Switch>
)

export default Routes
