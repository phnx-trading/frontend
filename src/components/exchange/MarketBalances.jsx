'use strict';

import React from 'react';
import { getBalances } from '../../helpers/AppDataHelper.js';

const extra = [`free`, `extra`, `used`, `total`];

class MarketBalances extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balances: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.symbol !== nextProps.symbol || 
        this.props.exchange !== nextProps.exchange ||
        this.props.apiKey !== nextProps.apiKey ||
        this.props.apiSecret !== nextProps.apiSecret) this.getData(nextProps);
  }

  getData(props = this.props) {
    let keys = props.symbol.toUpperCase().split(`/`);

    getBalances(props.exchange, props.apiKey, props.apiSecret).then((data) => {
      this.setState({
        balances: Object.keys(data).filter((k) => {
          return !extra.includes(k) && keys.includes(k.toUpperCase());
        }).map((k) => ({
          ...data[k],
          coin: k
        }))
      });
    });
  }

  render() {
    return (
      <div>
        <h3>Balances</h3>
        <table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Free</th>
              <th>Used</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.balances.map((b) => (
                <tr key={ b.coin }>
                  <td>{ b.coin }</td>
                  <td>{ b.free }</td>
                  <td>{ b.used }</td>
                  <td>{ b.total }</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default MarketBalances;
