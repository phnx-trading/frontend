'use strict';

import React from 'react';
import MarketTrendline from './MarketTrendline.jsx';

const MarketHeader = ({ symbol, exchange, trendlineData, trendlineDataLoaded, ticker, tickerLoaded, symbolInfo, symbolInfoLoaded }) => (
  <div className="market-header">
    <div className="market-trendline-wrapper">
      <MarketTrendline
        data={ trendlineData }
        loaded={ trendlineDataLoaded } />
    </div>
    { !tickerLoaded && (<h1 exchange={ exchange.toLowerCase() }>{ symbol.toUpperCase() }</h1>) }
    { tickerLoaded && (
      <h1 exchange={ exchange.toLowerCase() }>{ ticker.symbol } • <small>{ ticker.hasOwnProperty(`change`) ? (ticker.change > 0 ? `▲` : `▼`) : `` }</small> { 
        ticker.last.toFixed(symbolInfoLoaded && symbolInfo.precision.price ? symbolInfo.precision.price : 8)
      }</h1>
    ) }
  </div>
);

export default MarketHeader;
