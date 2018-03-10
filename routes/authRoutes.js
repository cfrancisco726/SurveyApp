const passport = require('passport');

// app.get('/', (req, res) => {
// 	res.send({ bye: 'There' });
// });
// route handler
module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'] //asking google to give us access to profile and email info
		})
	); //GoogleStrategy has an internal identifier of google

	app.get('/auth/google/callback', passport.authenticate('google'));
	//this time passport will see the code in the url and not seeing for the first time. attempting to turn code to actual profile
};
