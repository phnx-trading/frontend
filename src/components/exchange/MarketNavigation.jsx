'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import { getExchanges, getMarkets } from '../../helpers/AppDataHelper.js';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exchanges: [],
      markets: [],
      selectedExchange: this.props.exchange,

      exchangesLoaded: false,
      marketsLoaded: false
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    getExchanges().then((exchanges) => {
      this.setState({
        exchanges,
        exchangesLoaded: true
      });
    });

    this.getMarkets(this.state.selectedExchange);
  }

  getMarkets(exchange) {
    getMarkets(exchange).then((markets) => {
      this.setState({
        markets,
        marketsLoaded: true
      });
    });
  }

  selectExchange(exchange) {
    this.setState({
      markets: [],
      selectedExchange: exchange,
      marketsLoaded: false
    }, () => this.getMarkets(exchange));
  }

  render() {
    return (
      <aside className="market-navigation">
        <ul>
          {
            this.state.exchanges.map((exchange) => (
              <li 
                key={ exchange } 
                className={ exchange == this.state.selectedExchange ? `active` : `` }>
                <span onClick={ () => this.selectExchange(exchange) }>{ exchange }</span>
              </li>
            ))
          }
        </ul>
        <ul>
          {
            this.state.markets.map((market) => (
              <li 
                key={ market }
                className={ this.props.symbol.toLowerCase() == market.toLowerCase() && this.state.selectedExchange == this.props.exchange ? `active` : `` }>
                <Link to={ `/${ this.state.selectedExchange }/${ market }` }>
                  { market }
                </Link>
              </li>
            ))
          }
        </ul>
      </aside>
    );
  }
}

export default Main;
