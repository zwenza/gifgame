import * as types from '../constants/ActionTypes';

// game action creators
export const createGame = opponentUserName => ({ type: types.CREATE_GAME, payload: { opponent: { name: opponentUserName } }})
export const loadGame = game => ({ type: types.CREATE_GAME_SUCCESS, payload: game })
