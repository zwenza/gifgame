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

const app = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={StartGame}/>
        <Route path="/lobby" component={Lobby}/>
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
