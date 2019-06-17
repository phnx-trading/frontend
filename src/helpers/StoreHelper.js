'use strict';

import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
import { persistStore, autoRehydrate } from 'redux-persist';
import crosstabSync from 'redux-persist-crosstab';

const store = createStore(reducer, applyMiddleware(), compose(autoRehydrate()));
const persistor = persistStore(store, {
  keyPrefix: `phnx->v1->`
});

crosstabSync(persistor);

export default store;
