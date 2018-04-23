// SurveyForm shows a form for a user to add input

import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
// reduxForm helper allows reduxForm to communicate with redux store
// {} means we want specific value
// similar to connect helper but only takes one argument
// Field for rendering any type of html form element
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field component={SurveyField} type="text" label={label} name={name} />
			);
		});
	}
	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>

					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="teal bt-flat right white-text">
						next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}
// handleSubmit provided by reduxForm helper
//this.props.onSurveySubmit() is not a function because we dont want
// to call immediately

function validate(values) {
	// when you first render the validation function automatically runs
	const errors = {};

	errors.recipients = validateEmails(values.recipients || '');

	_.each(formFields, ({ name }) => {
		// match up property names on error object to match property name on field object errors will be sent to the appropriate field
		if (!values[name]) {
			errors[name] = 'You must provide a value';
		}
	});

	return errors;
}

export default reduxForm({
	// only requires one option or property to be passed in
	// reduxForm adds additional props to surveyForm such as handleSubmit
	validate,
	form: 'surveyForm',
	// specifies where redux form is going to store all the values out of the form inside our redux store
	destroyOnUnmount: false
	// if form is unmounted do not destroy SurveyForm
})(SurveyForm);
