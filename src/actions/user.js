import * as types from '../constants/ActionTypes';

// user action creators
export const createUser = userName => ({ type: types.CREATE_USER, payload: { userName } })
