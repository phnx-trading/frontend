'use strict';

import React from 'react';
import moment from 'moment';
import { getOpenOrders, cancelOrder } from '../../helpers/AppDataHelper.js';
import { sortDesc } from '../../helpers/SortHelper.js';

class OpenOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: []
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
    getOpenOrders(props.exchange, props.symbol, props.apiKey, props.apiSecret).then((data) => {
      this.setState({
        orders: data.filter((o) => o.status == `open` && o.symbol == props.symbol.toUpperCase()).sort(sortDesc(`datetime`, (d) => +(new Date(d))))
      });
    });
  }

  cancelOrder(orderId) {
    cancelOrder(this.props.exchange, this.props.symbol, orderId, this.props.apiKey, this.props.apiSecret).then(() => {
      this.getData();
    });
  }

  render() {
    return (
      <div>
        <h3>Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Side</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Total</th>
              <th>Type</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {
              this.state.orders.map((o) => (
                <tr key={ o.id }>
                  <td>{ moment(o.datetime).format(`lll`) }</td>
                  <td>{ o.side }</td>
                  <td>{ o.amount }</td>
                  <td>{ o.price }</td>
                  <td>{ o.cost }</td>
                  <td>{ o.type }</td>
                  <td><button onClick={ () => this.cancelOrder(o.id) }>Cancel</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default OpenOrders;
