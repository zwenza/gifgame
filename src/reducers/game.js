import {
  CREATE_GAME_SUCCESS,
  GET_RANDOM_GIF,
  GET_RANDOM_GIF_SUCCESS,
  GET_RANDOM_GIF_FAILURE,
  SET_OPPONENT
} from '../constants/ActionTypes'

export default function(state = {}, action) {
  switch(action.type){
    case SET_OPPONENT:
      return {
        ...state,
        opponent: action.payload.opponent.name
      }
    case CREATE_GAME_SUCCESS:
      return {
        ...state,
        currentGame: action.payload
      };
    case GET_RANDOM_GIF:
      return {
        ...state,
        loading: true
      }
    case GET_RANDOM_GIF_SUCCESS:
      return {
        ...state,
        url: action.payload.image_original_url,
        loading: false
      }
    case GET_RANDOM_GIF_FAILURE:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}
