import { CREATE_LOBBY_SUCCESS } from '../constants/ActionTypes'

export default function(state = {}, action) {
  switch(action.type){
    case CREATE_LOBBY_SUCCESS:
      return Object.assign({}, state, { name: action.payload.lobbyName, players: action.payload.players });
    default:
      return state;
  }
}
