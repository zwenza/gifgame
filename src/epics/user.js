import { Observable } from 'rxjs/Observable'
import * as ActionTypes from '../constants/ActionTypes'
import * as firebase from 'firebase';
import 'rxjs';

export const createUser = (action$, store) => action$
  .ofType(ActionTypes.CREATE_USER)
  .do(action => firebase.database().ref('waiting/' + action.payload.userName).set({
    username: action.payload.userName
  }))
  .map(() => ({
    type: ActionTypes.CREATE_USER_SUCCESS
  }))
  .catch(error => Observable.of(
    {
      type: ActionTypes.CREATE_USER_FAILURE,
      payload: {
        error,
      },
    }
  ));
