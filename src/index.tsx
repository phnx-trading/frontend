'use strict';

import * as React from 'react';
import { useState, useEffect, FunctionComponent } from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';

let getData = () => axios.get(`https://exchange.phnx.dev/v1/exchanges`);

const App:FunctionComponent = () => {
  const [exchanges, updateExchanges] = useState<Array<string>>([]),
    [loaded, updateLoaded] = useState<boolean>(false);

  useEffect(() => {
    getData().then((response) => {
      updateExchanges(response.data.result);
      updateLoaded(true);
    });
  }, []);

  return (
    <div>
      {
        loaded ? (
          <ul>
            {
              exchanges.map((item) => (
                <li key={ item }>
                  { item }
                </li>
              ))
            }
          </ul>
        ) : (
          <span>Loading...</span>
        )
      }
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById(`app`));
