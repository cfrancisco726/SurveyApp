const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema],
	one: { type: Number, default: 0 },
	two: { type: Number, default: 0 },
	three: { type: Number, default: 0 },
	four: { type: Number, default: 0 },
	five: { type: Number, default: 0 },
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	dateSent: Date,
	lastResponded: Date
});

mongoose.model('surveys', surveySchema);
