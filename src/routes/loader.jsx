'use strict';

import React from 'react';

class Loader extends React.Component {
  state = {
    component: null
  }

  componentDidMount() {
    this._mounted = true;

    this.props.load()
      .then((component) => {
        this._mounted && this.setState(() => ({
          component: component.default ? component.default : component
        })); 
      });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return this.props.children(this.state.component);
  }
}

export default Loader;
