import {
  CREATE_GAME_SUCCESS,
  GET_RANDOM_GIF,
  GET_RANDOM_GIF_SUCCESS,
  GET_RANDOM_GIF_FAILURE,
  GET_RANDOM_ANSWER_GIF,
  GET_RANDOM_ANSWER_GIF_SUCCESS,
  GET_RANDOM_ANSWER_GIF_FAILURE,
  SET_OPPONENT
} from '../constants/ActionTypes'

const defaultState = {
  answerGifUrls: []
}

export default function(state = defaultState, action) {
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
      let gifs = state.answerGifUrls.splice(0);
      gifs.push(action.payload);
      return {
        ...state,
        url: action.payload,
        answerGifUrls: gifs,
        loading: false
      }
    case GET_RANDOM_GIF_FAILURE:
      return {
        ...state,
        loading: false
      }
    case GET_RANDOM_ANSWER_GIF:
      return {
        ...state,
        loading: true
      }
    case GET_RANDOM_ANSWER_GIF_SUCCESS:
      let gifs2 = state.answerGifUrls.splice(0);
      gifs2.push(action.payload);
      return {
        ...state,
        answerGifUrls: gifs2,
        loading: false
      }
    case GET_RANDOM_ANSWER_GIF_FAILURE:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}
