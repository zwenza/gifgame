import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './store.js'

import App from './components/App';
import StartGame from './components/layouts/StartGame';
import Lobby from './components/layouts/Lobby'


// styles
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

const history = syncHistoryWithStore(browserHistory, store)

const requireGamertag = (nextState, replace) => {
  const state = store.getState();
  if(Object.keys(state.user).length === 0) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const app = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={StartGame}/>
        <Route path="/lobby" component={Lobby} onEnter={requireGamertag}/>
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
