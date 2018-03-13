const passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'] //asking google to give us access to profile and email info
		})
	); //GoogleStrategy has an internal identifier of google

	app.get('/auth/google/callback', passport.authenticate('google'));
	//this time passport will see the code in the url and not seeing for the first time. attempting to turn code to actual profile

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
		// kills the cookie
	});

	app.get('/api/current_user', (req, res) => {
		req.send(req.session);
		// cookie session extracts cookie data but assigns to req.session property
		//  passport is looking at req.session
		// pulls out relevant data and passes onto deserializeUser
		res.send(req.user);
		// passport automatically attaches user prop to req object
		// testing access
	});
};
// assuming we are calling this function with app so need to pass in app
