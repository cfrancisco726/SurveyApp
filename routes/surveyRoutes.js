const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
// sometimes running tests with mongoose will sometimes result in complaints if you attempt to require in model file multiple times
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');
// mongoose model class
module.exports = app => {
	app.get('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select({
			recipients: false
			// do not return list of all recipients 
		});

		res.send(surveys);
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting');
	});

	// app.post('/api/surveys/webhooks', (req, res) => {
	// 	const events = _.map(req.body, event => {
	// 		const pathname = new URL(event.url).pathname;
	// 		const p = new Path('/api/surveys/:surveyId/:choice');
	// 		// extract from url
	// 		const match = p.test(pathname);
	// 		if (match) {
	// 			return {
	// 				email: event.email,
	// 				surveyId: match.surveyId,
	// 				choice: match.choice
	// 			};
	// 		}
	// 	});
	// });

	// app.post('/api/surveys/webhooks', (req, res) => {
	// 	const p = new Path('/api/surveys/:surveyId/:choice');
	//
	// 	const events = _.map(req.body, ({ email, url }) => {
	// 		const match = p.test(new URL(url).pathname);
	// 		// extract from url
	// 		if (match) {
	// 			return {
	// 				email,
	// 				surveyId: match.surveyId,
	// 				choice: match.choice
	// 			};
	// 		}
	// 	});

	app.post('/api/surveys/webhooks', (req, res) => {
		// sendgrid post request after clicking email
		// path set in sendgrid email settings
		// need to extract data from yes or no click
		// id and choice is sent to sendgrid in the url
		// console.log(req.body);
		const p = new Path('/api/surveys/:surveyId/:choice');
		// extract a certain path

		const events = _.chain(req.body)
			// can chain on many lodash helpers
			.map(({ email, url }) => {
				const match = p.test(new URL(url).pathname);
				// extracts path from URL for each event
				// matcher to extract survey id and choice
				// match will either be null or object
				if (match) {
					return {
						email,
						surveyId: match.surveyId,
						choice: match.choice
					};
				}
			})
			.compact()
			// compact removes undefined elements
			.uniqBy('email', 'surveyId')
			// eliminates dupes
			.each(({ surveyId, email, choice }) => {
				// passing in event but we only care about the following
				Survey.updateOne(
					{
						_id: surveyId,
						// mongoose understands id but you need _ for mongo
						recipients: {
							$elemMatch: { email: email, responded: false }
						}
					},
					{
						$inc: { [choice]: 1 },
						$set: { 'recipients.$.responded': true },
						lastResponded: new Date()
					}
				).exec();
				// executes query
			})
			.value();
		// pull out underlying array
		// no need for async await because were just updating data
		// console.log(events);

		res.send({});
		// to tell sendgrid everything is ok
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			// title: title, es6
			subject,
			body,
			// recipients: recipients.split(',').map(email => {
			// 	return { email: email };
			// })
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			// recipients: recipients.split(',').map(email => ({ email })
			// wrap email with () to let js interpreter it is a shortened object
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
			// sent to sendgrid api
			// async, must wait till finish
			// not only must we mark mailer send async but route handler as well
			await survey.save();
			// saved to db
			req.user.credits -= 1;
			const user = await req.user.save();
			// whenever we save the user on req object the user is considered stale. need to save to const user
			res.send(user);
			// send back updated user model inside our auth reducer to show update credits in header
			// updates header
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
