const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema],
	// subdocument collection
	// every object must obey the schema designed
	// only let any given end user click on an email link one time
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	// reference field to set up relationship with given user and survey
	// every schema will belong to a particular user
	// each user will have id
	// ref means belongs to User collection
	// _user is convention to have _ prefix to indicate a relationship with another model
	dateSent: Date,
	lastResponded: Date
});

mongoose.model('surveys', surveySchema);
