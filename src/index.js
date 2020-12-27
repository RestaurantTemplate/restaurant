// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import Routes from './routes';

import './index.css';

ReactDOM.render(
  <HashRouter basename={'/'}>
    <Routes/>
  </HashRouter>,
  document.getElementById('root')
);