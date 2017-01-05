import { createUser } from './user'
import { createLobby } from './lobby'
import { combineEpics } from 'redux-observable'

const rootEpic = combineEpics(
  createUser,
  createLobby
);

export default rootEpic;
