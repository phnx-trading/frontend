'use strict';

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Set up Redux
import { Provider } from 'react-redux';
import store from '../helpers/StoreHelper.js';

import App from './App.jsx';


const Root = () => (
  <Provider store={ store }>
    <BrowserRouter>
      <Route 
        path="*"
        component={ App } />
    </BrowserRouter>
  </Provider>
);

export default Root;
