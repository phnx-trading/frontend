'use strict';

import React from 'react';
import MarketNavigation from './MarketNavigation.jsx';
import MarketDataLayer from './MarketDataLayer.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    let exchange = this.props.match.params.exchange,
      symbol = `${ this.props.match.params.primary }/${ this.props.match.params.quote }`;

    return (
      <div className="exchange-main">
        <MarketNavigation exchange={ exchange } symbol={ symbol } />
        <MarketDataLayer exchange={ exchange } symbol={ symbol } />
      </div>
    );
  }
}

export default Main;
