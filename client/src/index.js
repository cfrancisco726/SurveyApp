import 'materialize-css/dist/css/materialize.min.css';
import styles from './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	// created a redux store an hooked up to react side of app by placing provider tag
	// provider tag knows how to read changes from our redux store
	// anytime the redux store gets new state produced inside it the provider will inform all its children components App and update with new state
	document.querySelector('#root')
);

// console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
// console.log('environment is', process.env.NODE_ENV);
