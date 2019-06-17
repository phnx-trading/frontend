'use strict';

import React from 'react';
import moment from 'moment';
import { sortDesc } from '../../helpers/SortHelper.js';

const MarketTrades = ({ trades, tradesLoaded, symbolInfo, symbolInfoLoaded }) => (
  <div className="trades">
    <h3>Recent Trades</h3>
    { !tradesLoaded && (<span> loading... </span>) }
    { tradesLoaded && (
      <div className="scroll-wrapper">
        <table>
          <thead>
            <tr>
              <th>side</th>
              <th>amount</th>
              <th>price</th>
              <th>total</th>
              <th>timestamp</th>
            </tr>
          </thead>
          <tbody>
            {
              trades.sort(sortDesc(`timestamp`)).map((trade, i) => (
                <tr key={ i }>
                  <td>{ trade.side }</td>
                  <td className="number">{ trade.amount.toFixed(symbolInfoLoaded && symbolInfo.precision.base ? symbolInfo.precision.base : 8) }</td>
                  <td className="number">{ trade.price.toFixed(symbolInfoLoaded && symbolInfo.precision.price ? symbolInfo.precision.price : 8) }</td>
                  <td className="number">{ trade.cost.toFixed(symbolInfoLoaded && symbolInfo.precision.base ? symbolInfo.precision.base : 8) }</td>
                  <td>{ moment(trade.datetime).format(`lll`) }</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    ) }
    
  </div>
);

export default MarketTrades;
