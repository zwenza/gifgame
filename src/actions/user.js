import * as types from '../constants/ActionTypes';

export const createUser = (userName) => ({ type: types.CREATE_USER, payload: { userName } })
