import * as types from './actionTypes';
import { updateObject } from '../utility';

const initialState = {
  title: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
    case types.MAIN_EXAMPLE:
      return updateObject(state, { title: action.payload });
    default:
      return state;
  }
}
