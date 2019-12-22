import * as types from './actionTypes';

export const setTitleExample = (value) => {
  return {
    type: types.MAIN_EXAMPLE,
    payload: value
  }
}