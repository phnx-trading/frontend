'use strict';

import React from 'react';

const MarketSymbolInfo = ({ symbolInfo, symbolInfoLoaded }) => (
  <div>
    <h3>Symbol Info</h3>
    { symbolInfoLoaded && (<pre>{ JSON.stringify(symbolInfo, null, 2) }</pre>) }
    { !symbolInfoLoaded && (<span> loading... </span>) }
  </div>
);

export default MarketSymbolInfo;
