import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider as ReduxProvider } from 'react-redux'
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import 'bootstrap-css-only/css/bootstrap.min.css';

import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk));



ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
       <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);




