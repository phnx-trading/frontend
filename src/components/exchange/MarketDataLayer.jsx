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
import MarketSymbolInfo from './MarketSymbolInfo.jsx';
import MarketTrades from './MarketTrades.jsx';
import MarketOrderbook from './MarketOrderbook.jsx';
import MarketTicker from './MarketTicker.jsx';

class MarketDataLayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      symbolInfo: { },
      symbolInfoLoaded: false,

      trades: [],
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
      this.setState(this.getInitialState(), () => this.getData(nextProps.exchange, nextProps.symbol));
    }
  }

  getData(exchange = this.props.exchange, symbol = this.props.symbol) {
    getSymbol(exchange, symbol).then((symbolInfo) => this.setState({ symbolInfo, symbolInfoLoaded: true }));
    getSymbolTrades(exchange, symbol).then((trades) => this.setState({ trades, tradesLoaded: true }));
    getSymbolOrderbook(exchange, symbol).then((orderbook) => this.setState({ orderbook, orderbookLoaded: true }));
    getSymbolTicker(exchange, symbol).then((ticker) => this.setState({ ticker, tickerLoaded: true }));
    getSymbolOHLCV(exchange, symbol).then((ohlcv) => this.setState({ ohlcv, ohlcvLoaded: true }));
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
        <MarketTicker
          ticker={ this.state.ticker }
          tickerLoaded={ this.state.tickerLoaded } />
        <MarketSymbolInfo
          symbolInfo={ this.state.symbolInfo }
          symbolInfoLoaded={ this.state.symbolInfoLoaded } />
        <MarketTrades
          trades={ this.state.trades }
          tradesLoaded={ this.state.tradesLoaded } />
        <MarketOrderbook
          orderbook={ this.state.orderbook }
          orderbookLoaded={ this.state.orderbookLoaded } />
      </div>
    );
  }
}

export default MarketDataLayer;
