import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'; //redux log
import rootReducer from '../Reducers/RootReducer';

const Store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger),
  //   applyMiddleware(thunk),
);

export default Store;
