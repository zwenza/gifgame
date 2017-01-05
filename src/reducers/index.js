import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import user from './user'
import game from './game'

const rootReducer = combineReducers({
  user,
  game,
  routing: routerReducer
});

export default rootReducer;
