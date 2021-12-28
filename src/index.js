// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import ContextProvider from './reducers/compareReducer'

import './index.css'

ReactDOM.render(
    <ContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>            
    </ContextProvider>,
    document.getElementById('root')
)

reportWebVitals();
