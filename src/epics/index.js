import { createUser } from './user'
import { combineEpics } from 'redux-observable'

const rootEpic = combineEpics(
  createUser
);

export default rootEpic;
