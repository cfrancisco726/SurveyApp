import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// export const changeLogIn = shouldBeLoggedIn => {
// 	return {
// 		type: 'change_auth',
// 		payload: shouldBeLoggedIn
// 	};
// };

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};

// export const fetchUser = () => {
// 1 expression you can move the {} and remove return
// 	return function(dispatch) {
// 		axios
// 			.get('/api/current_user')
// 			.then(res => dispatch({ type: FETCH_USER, payload: res }));
// 	};
// };
// refactored

// with out dispatch
// const fetchUser = () => {
// 	const request = axios.get('/api/current_user');
//
// 	return {
// 		type: FETCH_USER,
// 		payload: request
// 	};
// };

export const handleToken = token => async dispatch => {
	const res = await axios.post('/api/stripe', token);
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post('/api/surveys', values);

	history.push('/surveys');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');

	dispatch({ type: FETCH_SURVEYS, payload: res.data });
	// watch for fetch type and return list of surveys
	// payload is array of all the surveys 
};
