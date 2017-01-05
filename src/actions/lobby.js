import * as types from '../constants/ActionTypes';

// lobby action creators
export const createLobby = opponentUserName => ({ type: types.CREATE_LOBBY, payload: { opponent: { username: opponentUserName} } })
export const acceptInvite = () => ({ type: types.ACCEPT_INVITE })
export const declineInvite = () => ({ type: types.DECLINE_INVITE })
export const invitePlayer = name => ({ type: types.INVITE_PLAYER, payload: { name }})
