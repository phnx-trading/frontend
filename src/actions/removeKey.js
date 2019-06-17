'use strict';

import { REMOVE_KEY } from './index.js';

export function removeKey(keyId) {
  return {
    type: REMOVE_KEY,
    payload: keyId
  };
}
