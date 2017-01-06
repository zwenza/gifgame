import { createUser } from './user'
import { acceptInvite, declineInvite, invitePlayer } from './lobby'
import { createGame, getRandomGIF, getRandomAnswerGIF } from './game'
import { combineEpics } from 'redux-observable'

const rootEpic = combineEpics(
  createUser,
  acceptInvite,
  declineInvite,
  invitePlayer,
  createGame,
  getRandomGIF,
  getRandomAnswerGIF
);

export default rootEpic;
