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
    {
      tickerLoaded && (
        <table>
          <tbody>
            <tr>
              <td>High</td>
              <td className="number">{ ticker.high.toFixed(symbolInfoLoaded && symbolInfo.precision.price ? symbolInfo.precision.price : 8) }</td>
              <td>Bid</td>
              <td className="number">{ ticker.bid.toFixed(symbolInfoLoaded && symbolInfo.precision.price ? symbolInfo.precision.price : 8) }</td>
              <td>Volume ({ symbolInfoLoaded ? symbolInfo.base : `base` })</td>
              <td className="number">{ ticker.baseVolume.toFixed(symbolInfoLoaded && symbolInfo.precision.base ? symbolInfo.precision.base : 8) }</td>
            </tr>
            <tr>
              <td>Low</td>
              <td className="number">{ ticker.low.toFixed(symbolInfoLoaded && symbolInfo.precision.price ? symbolInfo.precision.price : 8) }</td>
              <td>Ask</td>
              <td className="number">{ ticker.ask.toFixed(symbolInfoLoaded && symbolInfo.precision.price ? symbolInfo.precision.price : 8) }</td>
              <td>Volume ({ symbolInfoLoaded ? symbolInfo.quote : `quote` })</td>
              <td className="number">{ ticker.quoteVolume.toFixed(symbolInfoLoaded && symbolInfo.precision.quote ? symbolInfo.precision.quote : 8) }</td>
            </tr>
          </tbody>
        </table>
      )
    }
  </div>
);

export default MarketHeader;
