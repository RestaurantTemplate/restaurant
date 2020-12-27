// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import './index.css';

ReactDOM.render(
  <BrowserRouter basename={'/'}>
    <Routes/>
  </BrowserRouter>,
  document.getElementById('root')
);