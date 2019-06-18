'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { addKey } from '../../actions/addKey.js';
import { removeKey } from '../../actions/removeKey.js';
import { setPassword } from '../../actions/setPassword.js';
import sjcl from 'sjcl';

const valid = `pleaseletmein`, salt = `1f2ifaz66flxr`;

class AccountManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedKeyId: ``,
      orderType: `market`,
      orderSide: `buy`,
      orderAmount: 0,
      orderPrice: 0,

      password: ``,
      passwordConfirm: ``,
      authenticated: false,
      newKey: ``,
      newSecret: ``
    };
  }

  savePassword() {
    let pw = sjcl.encrypt(this.state.password, valid, { ks: 256, salt });

    pw = JSON.stringify({ ...JSON.parse(pw), salt });

    this.props.setPassword(pw);
    this.setState({
      password: ``,
      passwordConfirm: ``
    });
  }

  addKey() {
    if (this.state.newKey.length == 0) return;

    let k = sjcl.encrypt(this.state.password, this.state.newKey, { ks: 256, salt });
    k = JSON.stringify({ ...JSON.parse(k), salt });

    let s = sjcl.encrypt(this.state.password, this.state.newSecret, { ks: 256, salt });
    s = JSON.stringify({ ...JSON.parse(s), salt });

    this.props.addKey(this.props.exchange, k, s);

    this.setState({
      newKey: ``,
      newSecret: ``
    });
  }

  render() {
    if (this.props.password == ``) {
      return (
        <div className="account-manager">
          <h3>Enter New Password</h3>
          <input 
            type="text" 
            value={ this.state.password }
            onChange={ (e) => this.setState({ password: e.target.value }) }
            placeholder={ `New Password` } />
          <input 
            type="text" 
            value={ this.state.passwordConfirm }
            onChange={ (e) => this.setState({ passwordConfirm: e.target.value }) }
            placeholder={ `Confirm New Password` } />
          <button
            onClick={ () => this.savePassword() }
            disabled={ this.state.password.length == 0 || this.state.password !== this.state.passwordConfirm }>
            Save
          </button>
        </div>
      );
    }

    try {
      if (!this.state.authenticated) {
        let p = sjcl.decrypt(this.state.password, this.props.password);

        if (p == valid) {
          this.setState({
            authenticated: true
          });
        }
      }
    }  /* eslint-disable */ catch(e) { } /* eslint-enable */

    if (!this.state.authenticated) {
      return (
        <div className="account-manager">
          <h3>Enter Password To Unlock</h3>
          <input 
            type="text" 
            value={ this.state.password }
            onChange={ (e) => this.setState({ password: e.target.value }) }
            placeholder={ `Password` } />
        </div>
      );
    }

    let keys = this.props.keys.map((key) => {
      let { apiKey, apiSecret } = key;

      try {
        apiKey = sjcl.decrypt(this.state.password, apiKey);
      } /* eslint-disable */ catch(e) { apiKey = `[ encrypted ]` } /*eslint-enable */

      try {
        apiSecret = sjcl.decrypt(this.state.password, apiSecret);
      } /* eslint-disable */ catch(e) { apiSecret = `[ encrypted ]` } /*eslint-enable */

      return {
        ...key,
        apiKey, 
        apiSecret
      };
    });

    return (
      <div>
        <h3>Keys</h3>
        <table>
          <thead>
            <tr>
              <th>
                Key
              </th>
              <th>
                Secret
              </th>
              <th>
                Exchange
              </th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            { 
              keys.map((key) => (
                <tr key={ key.id }>
                  <td>{ key.apiKey }</td>
                  <td>{ key.apiSecret }</td>
                  <td>{ key.exchange }</td>
                  <td>
                    <button onClick={ () => this.props.removeKey(key.id) }>
                      remove
                    </button>
                  </td>
                  <td>
                    {
                      this.state.selectedKeyId !== key.id && (
                        <button onClick={ () => this.setState({ selectedKeyId: key.id }) }>
                          select
                        </button>
                      )
                    }
                  </td>
                </tr>
              ))
            }
            <tr>
              <td>
                <input 
                  type="text"
                  placeholder="API Key"
                  value={ this.state.newKey }
                  onChange={ (e) => this.setState({ newKey: e.target.value }) } />
              </td>
              <td>
                <input 
                  type="text"
                  placeholder="API Secret"
                  value={ this.state.newSecret }
                  onChange={ (e) => this.setState({ newSecret: e.target.value }) } />
              </td>
              <td>
                { this.props.exchange }
              </td>
              <td>
                <button onClick={ () => this.addKey() }>
                  add
                </button>
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  password: state.keys.password,
  keys: state.keys.keys
});

const mapDispatchToProps = (dispatch) => ({
  setPassword: (p) => dispatch(setPassword(p)),
  addKey: (e, k, s) => dispatch(addKey(e, k, s)),
  removeKey: (id) => dispatch(removeKey(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountManager);
