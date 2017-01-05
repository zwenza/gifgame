import { CREATE_GAME_SUCCESS } from '../constants/ActionTypes'

export default function(state = {}, action) {
  switch(action.type){
    case CREATE_GAME_SUCCESS:
      return {
        ...state,
        currentGame: action.payload
      };
    default:
      return state;
  }
}
