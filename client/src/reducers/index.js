import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
// can rename variables using as
import authReducer from './authReducer';

export default combineReducers({
	auth: authReducer,
	form: reduxForm
});
