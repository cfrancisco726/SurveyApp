// SurveyField contains logic to render a single
// label and text input

import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
	// pulls off input property from props and assigns to variable input
	// console.log(props.input);
	// input contains all callbacks
	// console.log(meta)

	return (
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: '5px' }} />
			<div className="red-text" style={{ marginBottom: '20px' }}>
				{touched && error}
			</div>
		</div>
	);
	// {...input} includes all event handlers ie onBlur
	// pass in label prop
	// if touched is true and error exists show error
};
