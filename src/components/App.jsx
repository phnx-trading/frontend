'use strict';

import React from 'react';
import { Switch } from 'react-router-dom';
import routes from '../routes/routes.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <main>
        <Switch>
          { routes }
        </Switch>
      </main>
    );
  }
}

export default App;
