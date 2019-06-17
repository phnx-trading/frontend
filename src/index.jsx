'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root.jsx';

/* eslint-disable */
console.warn(`Loading phnx version: ${ process.env.GIT_TAG }`);
/* eslint-enable */

if (`serviceWorker` in navigator) {
  window.addEventListener(`load`, function() {
    navigator.serviceWorker.register(`/service-worker.js`).then(function(registration) {
      /* eslint-disable */
      console.log(`ServiceWorker registration successful with scope: `, registration.scope);
      /* eslint-enable */
    }, function(err) {
      /* eslint-disable */
      console.log(`ServiceWorker registration failed: `, err);
      /* eslint-enable */
    });
  });
}

ReactDOM.render(<Root />, document.getElementById(`app`));
