import * as types from '../constants/ActionTypes';

export const createUser = (userName) => ({ type: types.CREATE_USER, payload: { userName } })
export const createLobby = (opponentUserName) => ({ type: types.CREATE_LOBBY, payload: { opponent: { username: opponentUserName} } })
export const acceptInvite = () => ({ type: types.ACCEPTED_INVITE })
