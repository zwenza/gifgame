import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from './epics'
import * as firebase from 'firebase';
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

var config = {
};

firebase.initializeApp(config);

const epicMiddleware = createEpicMiddleware(rootEpic);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// Apply the middleware to the store
const middleware = [routerMiddleware(browserHistory), epicMiddleware]

export default createStore(rootReducer, composeEnhancers(
  applyMiddleware(...middleware)
));
