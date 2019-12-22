import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const initialState = {};

// Reducers
import Main from './main/reducer';

const reducers = combineReducers({
  Main
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(thunk)
  )
);

export default store;