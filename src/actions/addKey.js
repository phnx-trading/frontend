'use strict';

import { ADD_KEY } from './index.js';

export function addKey(exchange, apiKey, apiSecret) {
  return {
    type: ADD_KEY,
    payload: {
      exchange,
      apiKey,
      apiSecret,
      id: Math.random().toString(36).substring(7)
    }
  };
}
