import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import store from './store.js'

import App from './components/App';

// styles
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
