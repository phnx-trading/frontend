'use strict';

import React from 'react';
import { 
  getSymbol, 
  getSymbolTrades, 
  getSymbolOrderbook, 
  getSymbolTicker, 
  getSymbolOHLCV 
} from '../../helpers/AppDataHelper.js';
import MarketHeader from './MarketHeader.jsx';
import MarketTrades from './MarketTrades.jsx';
import MarketOrderbook from './MarketOrderbook.jsx';
import AccountManager from './AccountManager.jsx';

class MarketDataLayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      symbolInfo: { },
      symbolInfoLoaded: false,

      trades: [ ],
      tradesLoaded: false,

      orderbook: { },
      orderbookLoaded: false,

      ticker: { },
      tickerLoaded: false,

      ohlcv: [ ],
      ohlcvLoaded: false
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.symbol !== nextProps.symbol || this.props.exchange !== nextProps.exchange) {
      clearTimeout(this.getDataTimeout);
      this.setState(this.getInitialState(), () => this.getData(nextProps.exchange, nextProps.symbol));
    }
  }

  getData(exchange = this.props.exchange, symbol = this.props.symbol) {
    clearTimeout(this.getDataTimeout);

    Promise.all([
      getSymbol(exchange, symbol).then((symbolInfo) => this.setState({ symbolInfo, symbolInfoLoaded: true })),
      getSymbolTrades(exchange, symbol).then((trades) => this.setState({ trades, tradesLoaded: true })),
      getSymbolOrderbook(exchange, symbol).then((orderbook) => this.setState({ orderbook, orderbookLoaded: true })),
      getSymbolTicker(exchange, symbol).then((ticker) => this.setState({ ticker, tickerLoaded: true })),
      getSymbolOHLCV(exchange, symbol).then((ohlcv) => this.setState({ ohlcv, ohlcvLoaded: true }))
    ]).then(() => {
      this.getDataTimeout = setTimeout(() => this.getData(), 1000);
    });
  }

  render() {
    return (
      <div className="market">
        <MarketHeader
          symbol={ this.props.symbol }
          exchange={ this.props.exchange }
          trendlineData={ this.state.ohlcv.map((d) => ({ date: d[0], value: d[4] })) }
          trendlineDataLoaded={ this.state.ohlcvLoaded }
          ticker={ this.state.ticker }
          tickerLoaded={ this.state.tickerLoaded }
          symbolInfo={ this.state.symbolInfo }
          symbolInfoLoaded={ this.state.symbolInfoLoaded } />
        <div className="market-widget-row">
          <AccountManager
            exchange={ this.props.exchange } />
        </div>
        <div className="market-widget-row">
          <MarketTrades
            trades={ this.state.trades }
            tradesLoaded={ this.state.tradesLoaded }
            symbolInfo={ this.state.symbolInfo }
            symbolInfoLoaded={ this.state.symbolInfoLoaded } />
          <MarketOrderbook
            orderbook={ this.state.orderbook }
            orderbookLoaded={ this.state.orderbookLoaded }
            symbolInfo={ this.state.symbolInfo }
            symbolInfoLoaded={ this.state.symbolInfoLoaded } />
        </div>
      </div>
    );
  }
}

export default MarketDataLayer;
