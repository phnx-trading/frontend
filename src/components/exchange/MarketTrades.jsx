'use strict';

import React from 'react';
import { sortDesc } from '../../helpers/SortHelper.js';

const MarketTrades = ({ trades, tradesLoaded }) => (
  <div>
    <h3>Recent Trades</h3>
    { !tradesLoaded && (<span> loading... </span>) }
    { tradesLoaded && (
      <ul>
        {
          trades.sort(sortDesc(`timestamp`)).map((trade, i) => (
            <li key={ i }>
              { trade.side } { trade.amount } @ { trade.price }
            </li>
          ))
        }
      </ul>
    ) }
    
  </div>
);

export default MarketTrades;
