'use strict';

import { 
  ADD_KEY,
  REMOVE_KEY
} from '../actions';

const initialState = {
  keys: []
};

export default function login(state = initialState, action) {
  switch(action.type) {
  case ADD_KEY: 
    return {
      ...state,
      keys: state.keys.concat([action.payload])
    };
  case REMOVE_KEY:
    return {
      ...state,
      keys: state.keys.filter(({ id }) => id !== action.payload)
    };
  default: 
    return state;
  }
}
