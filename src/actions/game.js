import * as types from '../constants/ActionTypes';

// game action creators
export const createGame = opponentUserName => ({ type: types.CREATE_GAME, payload: { opponent: { name: opponentUserName } }})
export const loadGame = game => ({ type: types.CREATE_GAME_SUCCESS, payload: game })
export const getRandomGIF = () => ({type: types.GET_RANDOM_GIF})
export const getRandomAnswerGIF = () => ({type: types.GET_RANDOM_ANSWER_GIF})
export const setOpponent = opponentUserName => ({ type: types.SET_OPPONENT, payload: { opponent: { name: opponentUserName } }})
export const updateGame = game => ({ type: types.UPDATE_GAME, payload: { game }})
