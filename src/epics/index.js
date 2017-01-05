import { createUser } from './user'
import { createLobby, acceptLobbyInvite } from './lobby'
import { combineEpics } from 'redux-observable'

const rootEpic = combineEpics(
  createUser,
  createLobby,
  acceptLobbyInvite
);

export default rootEpic;
