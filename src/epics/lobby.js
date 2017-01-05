import { Observable } from 'rxjs/Observable'
import * as ActionTypes from '../constants/ActionTypes'
import * as firebase from 'firebase';
import 'rxjs';

export const invitePlayer = (action$, store) => action$
  .ofType(ActionTypes.INVITE_PLAYER)
  .do(action => firebase.database().ref('invite/' + action.payload.name).set({
    by: store.getState().user.name
  }))
  .do(action => { firebase.database().ref('waiting/' + action.payload.name).set(null) })
  .do(() => { firebase.database().ref('waiting/' + store.getState().user.name).set(null) })
  .map(action => ({
      type: ActionTypes.INVITE_PLAYER_SUCCESS,
    }))
  .catch(error => Observable.of(
    {
      type: ActionTypes.INVITE_PLAYER_FAILURE,
      payload: {
        error
      }
    }
  ));

export const acceptInvite = (action$, store) => action$
  .ofType(ActionTypes.ACCEPT_INVITE)
  .do(action => firebase.database().ref('accept/' + store.getState().user.name).set({
    by: store.getState().user.name
  }))
  .do(() => firebase.database().ref('invite/' + store.getState().user.name).set(null))
  .map(action => ({
      type: ActionTypes.ACCEPT_INVITE_SUCCESS,
    }))
  .catch(error => Observable.of(
    {
      type: ActionTypes.ACCEPT_INVITE_FAILURE,
      payload: {
        error
      }
    }
  ));

export const declineInvite = (action$, store) => action$
  .ofType(ActionTypes.DECLINE_INVITE)
  .do(action => firebase.database().ref('decline/' + store.getState().user.name).set({
    by: store.getState().user.name
  }))
  .do(() => firebase.database().ref('invite/' + store.getState().user.name).set(null))
  .map(action => ({
      type: ActionTypes.DECLINE_INVITE_SUCCESS,
    }))
  .catch(error => Observable.of(
    {
      type: ActionTypes.DECLINE_INVITE_FAILURE,
      payload: {
        error
      }
    }
  ));
