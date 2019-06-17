'use strict';

import React from 'react';

const MarketOrderbook = ({ orderbook, orderbookLoaded }) => (
  <div>
    <h3>Orderbook</h3>
    { orderbookLoaded && (<pre>{ JSON.stringify(orderbook, null, 2) }</pre>) }
    { !orderbookLoaded && (<span> loading... </span>) }
  </div>
);

export default MarketOrderbook;
