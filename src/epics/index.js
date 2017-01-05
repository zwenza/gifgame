import { createUser } from './user'
import { acceptInvite, declineInvite, invitePlayer } from './lobby'
import { combineEpics } from 'redux-observable'

const rootEpic = combineEpics(
  createUser,
  acceptInvite,
  declineInvite,
  invitePlayer
);

export default rootEpic;
