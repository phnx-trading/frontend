'use strict';

import { SET_PASSWORD } from './index.js';

export function setPassword(password) {
  return {
    type: SET_PASSWORD,
    payload: password
  };
}
