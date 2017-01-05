import { Observable } from 'rxjs/Observable'
import * as ActionTypes from '../constants/ActionTypes'
import * as firebase from 'firebase';
import 'rxjs';

export const createLobby = (action$, store) => action$
  .ofType(ActionTypes.CREATE_LOBBY)
  .do(action => firebase.database().ref('lobby/' + store.getState().user.name.toLowerCase() + '_lobby').set({
    player1: {
      username: store.getState().user.name,
      accepted: false
    },
    player2: {
      username: action.payload.opponent.username,
      accepted: false
    }
  }))
  .do(() => firebase.database().ref('waiting/' + store.getState().user.name).set(null))
  .do(action => firebase.database().ref('waiting/' + action.payload.opponent.username).set(null))
  .map(action => ({
    type: ActionTypes.CREATE_LOBBY_SUCCESS,
    payload: {
      lobbyName: store.getState().user.name.toLowerCase() + '_lobby',
      players: {
        player1: {
          username: store.getState().user.name,
          accepted: false
        },
        player2: {
          username: action.payload.opponent.username,
          accepted: false
        }
      }
    }
  }))
  .catch(error => Observable.of(
    {
      type: ActionTypes.CREATE_LOBBY_FAILURE,
      payload: {
        error,
      },
    }
  ));
