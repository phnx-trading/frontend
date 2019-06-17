'use strict';

import React from 'react';

const MarketTicker = ({ ticker, tickerLoaded }) => (
  <div>
    <h3>Ticker</h3>
    { tickerLoaded && (<pre>{ JSON.stringify(ticker, null, 2) }</pre>) }
    { !tickerLoaded && (<span> loading... </span>) }
  </div>
);

export default MarketTicker;
