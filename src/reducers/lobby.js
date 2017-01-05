import { CREATE_LOBBY_SUCCESS, ACCEPTED_INVITE_SUCCESS } from '../constants/ActionTypes'

function playerReducer(player, action){
  switch(action.type){
    case ACCEPTED_INVITE_SUCCESS:
      return {
        ...player,
        accepted: true
      }
    default:
      return player
  }
}

export default function(state = {}, action) {
  switch(action.type){
    case CREATE_LOBBY_SUCCESS:
      return Object.assign({}, state, { name: action.payload.lobbyName, players: action.payload.players });
    case ACCEPTED_INVITE_SUCCESS:
      if(state.players.player1.username === action.payload.username){
        const player1 = playerReducer(state.players.player1, action);

        return {
          ...state,
          players: {
            ...state.players,
            player1
          }
        }
      } else {
        const player2 = playerReducer(state.players.player2, action);
        
        return {
          ...state,
          players: {
            ...state.players,
            player2
          }
        }
      }
    default:
      return state;
  }
}
