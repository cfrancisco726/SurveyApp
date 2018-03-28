const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		// creates the actual charges
		// bill card
		// send response to stripe from our api saying charge successful
		// express rule one of these functions passed in must return a response
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id
		});

		req.user.credits += 5;
		// current user model
		// set up automatically by passport
		const user = await req.user.save();
		// asynchronous request that will take some amount of time
		// users 2 separate objects in memory

		res.send(user);
	});
};
