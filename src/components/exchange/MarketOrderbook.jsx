'use strict';

import React from 'react';
import { sortAsc, sortDesc } from '../../helpers/SortHelper.js';

const MarketOrderbook = ({ orderbook, orderbookLoaded, symbolInfo, symbolInfoLoaded }) => {
  let bids, asks, maxCumulativeVolume;

  if (orderbookLoaded) {
    bids = orderbook.bids.sort(sortDesc(0)).reduce((list, bid) => {
      return list.concat([{
        price: bid[0],
        volume: bid[1],
        cumulative: bid[1] + (list[list.length - 1] || { cumulative: 0 }).cumulative
      }]);
    }, []).sort(sortAsc(`price`));

    asks = orderbook.asks.sort(sortAsc(0)).reduce((list, bid) => {
      return list.concat([{
        price: bid[0],
        volume: bid[1],
        cumulative: bid[1] + (list[list.length - 1] || { cumulative: 0 }).cumulative
      }]);
    }, []).sort(sortAsc(`price`));

    maxCumulativeVolume = asks.concat(bids).sort(sortDesc(`cumulative`))[0].cumulative;
  }

  return (
    <div className="orderbook">
      <h3>Orderbook</h3>
      { orderbookLoaded && (
        <div className="depth-chart">
          {
            bids.map((bid, i) => (
              <div 
                key={ i } 
                className="bid" 
                price={ bid.price } 
                style={ { 
                  height: `${ (bid.cumulative / maxCumulativeVolume) * 100 }%`,
                  width: `calc(100% / ${ bids.length + asks.length })`
                } } />
            ))
          }
          {
            asks.map((ask, i) => (
              <div 
                key={ i } 
                className="ask" 
                price={ ask.price } 
                style={ { 
                  height: `${ (ask.cumulative / maxCumulativeVolume) * 100 }%` ,
                  width: `calc(100% / ${ asks.length + bids.length })`
                } } />
            ))
          }
        </div>
      ) }
      { orderbookLoaded && (
        <div className="orderbook-table">
          <div className="scroll-wrapper">
            <table>
              <thead>
                <tr>
                  <th>
                    bid
                  </th>
                  <th>
                    volume
                  </th>
                  <th>
                    cumulative
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  bids.sort(sortDesc(`price`)).map((bid, i) => (
                    <tr key={ i }>
                      <td className="number">{ bid.price.toFixed(symbolInfoLoaded && symbolInfo.precision.price ? symbolInfo.precision.price : 8) }</td>
                      <td className="number">{ bid.volume.toFixed(symbolInfoLoaded && symbolInfo.precision.base ? symbolInfo.precision.base : 8) }</td>
                      <td className="number">{ bid.cumulative.toFixed(symbolInfoLoaded && symbolInfo.precision.base ? symbolInfo.precision.base : 8) }</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="scroll-wrapper">
            <table>
              <thead>
                <tr>
                  <th>
                    ask
                  </th>
                  <th>
                    volume
                  </th>
                  <th>
                    cumulative
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  asks.map((ask, i) => (
                    <tr key={ i }>
                      <td className="number">{ ask.price.toFixed(symbolInfoLoaded && symbolInfo.precision.price ? symbolInfo.precision.price : 8) }</td>
                      <td className="number">{ ask.volume.toFixed(symbolInfoLoaded && symbolInfo.precision.base ? symbolInfo.precision.base : 8) }</td>
                      <td className="number">{ ask.cumulative.toFixed(symbolInfoLoaded && symbolInfo.precision.base ? symbolInfo.precision.base : 8) }</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      ) }
      { !orderbookLoaded && (<span> loading... </span>) }
    </div>
  );
};

export default MarketOrderbook;
