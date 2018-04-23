const passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'], //asking google to give us access to profile and email info
			prompt: 'select_account'
		})
	); //GoogleStrategy has an internal identifier of google

	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);
	//this time passport will see the code in the url and not seeing for the first time. attempting to turn code to actual profile
	// passport is basically middleware
	// takes in coming request and takes code out of url and fetches profile then calls our call back in the google strategy
	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
		// res.send(req.user);
		// kills the cookie
		// sends back user model
	});

	app.get('/api/current_user', (req, res) => {
		// res.send(req.session);
		// cookie session extracts cookie data but assigns to req.session property
		//  passport is looking at req.session
		// pulls out relevant data and passes onto deserializeUser
		res.send(req.user);
		// passport automatically attaches user prop to req object
		// testing access
	});
};
// assuming we are calling this function with app so need to pass in app
