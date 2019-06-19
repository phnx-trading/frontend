'use strict';

import React from 'react';
import { placeOrder } from '../../helpers/AppDataHelper.js';

class TradeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      orderType: `market`,
      orderSide: `buy`,
      orderAmount: 0,
      orderPrice: this.props.price
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.apiKey !== this.props.apiKey ||
        nextProps.apiSecret !== this.props.apiSecret) this.setState({
          orderPrice: nextProps.price
        });
  }

  placeOrder() {
    placeOrder(this.props.exchange, this.props.symbol, this.state.orderType, this.state.orderSide, parseFloat(this.state.orderAmount), parseFloat(this.state.orderPrice), this.props.apiKey, this.props.apiSecret).then((data) => {
      if (data.success) this.setState(this.getInitialState());
    });
  }

  render() {
    return (
      <div>
        <h3>Place New Order</h3>
        <div>
          <select value={ this.props.orderType } onChange={ (e) => this.setState({ orderType: e.target.value }) }>
            <option value="market">market</option>
            <option value="limit">limit</option>
          </select>
        </div>
        <div>
          <select value={ this.props.orderSide } onChange={ (e) => this.setState({ orderSide: e.target.value }) }>
            <option value="buy">buy</option>
            <option value="sell">sell</option>
          </select>
        </div>
        <div>
          <input 
            type="number" 
            value={ this.state.orderAmount }
            onChange={ (e) => this.setState({ orderAmount: e.target.value }) }
            placeholder={ `Amount` } />
        </div>
        <div>
          <input 
            type="number" 
            value={ this.state.orderPrice }
            onChange={ (e) => this.setState({ orderPrice: e.target.value }) }
            placeholder={ `Price` } />
        </div>
        <div>
          <button onClick={ () => this.placeOrder() }>
            Place Order
          </button>
        </div>
      </div>
    );
  }
}

export default TradeForm;
