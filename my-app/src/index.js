import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Router} from 'react-router-dom';
import history from './history';

import {Provider} from 'react-redux';
import reducers from './reducers';
import {createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
// const composeEnhancers = compose;

export const store= createStore(
	reducers,
	composeEnhancers(applyMiddleware(reduxThunk))
);

export const persistor = persistStore(store);

ReactDOM.render(
      <Provider store={store}>
          <Router history={history}>
              <App />
          </Router>
      </Provider>,
	document.querySelector('#root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();