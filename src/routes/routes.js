'use strict';

import React from 'react';
import { Route } from 'react-router-dom';
import Loader from './loader.jsx';

const buildRoute = (name, path, exact = true) => (
  <Route
    exact={ exact }
    key={ name }
    path={ `/${ path !== undefined ? path : name }` }
    component={ (props) => (
      <Loader load={ () => System.import(`./${ name }.jsx`) }>
        {
          (Component) => Component == null ? null : <Component { ...props } />
        }
      </Loader>
    ) } />
);

export default [
  buildRoute(`index`, ``),
  buildRoute(`main`, `:exchange/:primary/:quote`),
  (
  <Route
      key={ `notfound` }
      component={ (props) => (
        <Loader load={ () => System.import(`./notfound.jsx`) }>
          {
            (Component) => Component == null ? null : <Component { ...props } />
          }
        </Loader>
      ) } />
  )
];
