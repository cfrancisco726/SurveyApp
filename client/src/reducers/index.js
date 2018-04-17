import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
// can rename variables using as
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
	auth: authReducer,
	// auth piece of state is being manufactured by the authReducer
	form: reduxForm,
	surveys: surveysReducer
});
