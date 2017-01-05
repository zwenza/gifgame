import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import user from './user';
import lobby from './lobby';

const rootReducer = combineReducers({
  user,
  lobby,
  routing: routerReducer
});

export default rootReducer;
