import { CREATE_USER } from '../constants/ActionTypes'

export default function(state = {}, action) {
  switch(action.type){
    case CREATE_USER:
      return Object.assign({}, state, { name: action.payload.userName });
    default:
      return state;
  }
}
