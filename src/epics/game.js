import { Observable } from 'rxjs/Observable'
import * as ActionTypes from '../constants/ActionTypes'
import * as firebase from 'firebase';
import 'rxjs';

export const createGame = (action$, store) => action$
  .ofType(ActionTypes.CREATE_GAME)
  .switchMap(action => firebase.database().ref('game/' + action.payload.opponent.name + '_' + store.getState().user.name).set({
    aktPlayer: store.getState().user.name,
    url: '',
    score: 0,
    words: [],
    selectedUrl: ''
  }))
  .map(response => ({
    type: ActionTypes.CREATE_GAME_SUCCESS,
    payload: {
      aktPlayer: store.getState().user.name,
      url: '',
      score: 0,
      words: [],
      selectedUrl: ''
    }
  }))
  .catch(error => Observable.of(
    {
      type: ActionTypes.CREATE_GAME_FAILURE,
      payload: {
        error,
      },
    }
  ));
