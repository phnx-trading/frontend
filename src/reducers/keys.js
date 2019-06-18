'use strict';

import { 
  ADD_KEY,
  REMOVE_KEY,
  SET_PASSWORD
} from '../actions';

const initialState = {
  keys: [],
  password: ``
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
  case SET_PASSWORD:
    return {
      ...state,
      password: action.payload
    };
  default: 
    return state;
  }
}
