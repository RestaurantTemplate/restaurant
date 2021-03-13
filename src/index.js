// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import Routes from './routes'
import Firebase, { FirebaseContext } from './firebase'

import './index.css'

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <HashRouter basename={'/'}>
            <Routes />
        </HashRouter>
    </FirebaseContext.Provider>,
    document.getElementById('root')
)
