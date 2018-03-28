const mongoose = require('mongoose');
// sometimes running tests with mongoose will sometimes result in complaints if you attempt to require in model file multiple times
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');
// mongoose model class

module.exports = app => {
	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks for voting');
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			// recipients: recipients.split(',').map(email => {
			// 	return { email: email };
			// })
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			// recipients: recipients.split(',').map(email => ({ email })
			// wrap email with () to let js interpreter it is an object
			// return email property email with email value
			_user: req.user.id,
			dateSent: Date.now()
		});

		// great place to send an email
		const mailer = new Mailer(survey, surveyTemplate(survey));
		// to customize how the mailer gets set up we need to pass in arguments
		// first argument is some object that contains those properties
		// second argument the html to show in email
		try {
			await mailer.send();
			// async, must wait till finish
			// not only must we mark mailer send async but route handler as well
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();
			// whenever we save the user on req object the user is considered stale. need to save to const user
			res.send(user);
			// send back updated user model to show update credits
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
