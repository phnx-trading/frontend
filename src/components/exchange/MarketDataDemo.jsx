'use strict';

import React from 'react';
import { 
  getSymbol, 
  getSymbolTrades, 
  getSymbolOrderbook, 
  getSymbolTicker, 
  getSymbolOHLCV 
} from '../../helpers/AppDataHelper.js';

class MarketDataDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbolInfo: { },
      trades: [],
      orderbook: { },
      ticker: { },
      ohlcv: [ ],

      dataLoaded: false
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.symbol !== nextProps.symbol || this.props.exchange !== nextProps.exchange) {
      this.setState({
        dataLoaded: false
      }, () => this.getData(nextProps.exchange, nextProps.symbol));
    }
  }

  getData(exchange = this.props.exchange, symbol = this.props.symbol) {
    Promise.all([
      getSymbol(exchange, symbol),
      getSymbolTrades(exchange, symbol),
      getSymbolOrderbook(exchange, symbol),
      getSymbolTicker(exchange, symbol),
      getSymbolOHLCV(exchange, symbol)
    ]).then(([symbolInfo, trades, orderbook, ticker, ohlcv]) => {
      this.setState({
        symbolInfo,
        trades,
        orderbook,
        ticker,
        ohlcv,
        dataLoaded: true
      });
    });
  }

  render() {
    return (
      <div className="market-data-demo">
        {
          this.state.dataLoaded ?
          [`symbolInfo`, `trades`, `orderbook`, `ticker`, `ohlcv`].map((key) => (
            <section key={ key }>
              <h2>{ key }</h2>
              <pre>{ JSON.stringify(this.state[key], null, 2) }</pre>
            </section>
          )) : (
            <span>Loading...</span>
          )
        }
      </div>
    );
  }
}

export default MarketDataDemo;
