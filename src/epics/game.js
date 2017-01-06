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

export const getRandomGIF = (action$, store) => action$
  .ofType(ActionTypes.GET_RANDOM_GIF)
  .switchMap(data => Observable.ajax({
      url: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC',
      crossDomain: true,
      method: 'GET',
      createXHR: function () {
        return new XMLHttpRequest();
      }
  })
  .map(res => res.response)
    .do(response => firebase.database().ref('game/' + store.getState().game.currentGame.name).set({
      url: response.data.image_original_url
    }))
    .mergeMap(response => Observable.of(
      {
        type: ActionTypes.GET_RANDOM_GIF_SUCCESS,
        payload: response.data.image_original_url,
      }
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.GET_RANDOM_GIF_FAILURE,
        payload: {
          error,
        },
      }
    )),
  );

  export const getRandomAnswerGIF = (action$, store) => action$
  .ofType(ActionTypes.GET_RANDOM_ANSWER_GIF)
  .switchMap(data => Observable.ajax({
      url: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC',
      crossDomain: true,
      method: 'GET',
      createXHR: function () {
        return new XMLHttpRequest();
      }
  })
  .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: ActionTypes.GET_RANDOM_ANSWER_GIF_SUCCESS,
        payload: response.data.image_original_url,
      }
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.GET_RANDOM_ANSWER_GIF_FAILURE,
        payload: {
          error,
        },
      }
    )),
  );
