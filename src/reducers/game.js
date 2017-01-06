import {
  CREATE_GAME_SUCCESS,
  GET_RANDOM_GIF,
  GET_RANDOM_GIF_SUCCESS,
  GET_RANDOM_GIF_FAILURE,
  GET_RANDOM_ANSWER_GIF,
  GET_RANDOM_ANSWER_GIF_SUCCESS,
  GET_RANDOM_ANSWER_GIF_FAILURE,
  UPDATE_GAME,
  SET_OPPONENT
} from '../constants/ActionTypes'

const defaultState = {
  answerGifUrls: []
}

export default function(state = defaultState, action) {
  switch(action.type){
    case UPDATE_GAME:
      const updatedPropertyKey = [Object.keys(action.payload.game)[0]];
      let gifs3 = state.answerGifUrls.splice(0);
      if(updatedPropertyKey[0] === 'url'){
        gifs3.push(action.payload.game.url);
      }
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          [Object.keys(action.payload.game)[0]]: action.payload.game[updatedPropertyKey]
        },
        answerGifUrls: gifs3
      }
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
        currentGame: {
          ...state.currentGame,
          url: action.payload
        },
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
