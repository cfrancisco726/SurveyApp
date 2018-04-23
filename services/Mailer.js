const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
	// Mailer class inherited from Mail object
	constructor({ subject, recipients }, content) {
		// content is html string from surveyTemplate
		// no curly braces needed for content because we are not destructuring
		super();

		this.sgApi = sendgrid(keys.sendGridKey);
		this.from_email = new helper.Email('no-reply@email.com');
		// who this email appears to be sent from
		// helper helps format to work correctly inside email
		this.subject = subject;
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients);
		// recipients property from our survey instance
		// recipients property is an array of objects where each has email property
		// an array of helper.Email(email)

		this.addContent(this.body);
		// built in function to Mail class
		// register this body wth the mailer
		this.addClickTracking();
		this.addRecipients();
		// take formatted list then register with actual email
	}
	// anytime new instance this gets initialized

	formatAddresses(recipients) {
		return recipients.map(({ email }) => {
			return new helper.Email(email);
			// format with email helper
		});
	}

	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	addRecipients() {
		const personalize = new helper.Personalization();

		this.recipients.forEach(recipient => {
			personalize.addTo(recipient);
		});
		this.addPersonalization(personalize);
	}

	async send() {
		// communicates mailer to sendgrid api
		const request = await this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON()
			// takes properties and converts to JSON data
			// send to SendGrid
		});

		const response = this.sgApi.API(request);
		return response;
	}
}

module.exports = Mailer;
