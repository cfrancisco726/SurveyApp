const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
			// route the user gets sent to after they are granted permission
		},
		(accessToken, refreshToken, profile, done) => {
			console.log('accessToken', accessToken);
			console.log('refreshToken', refreshToken);
			console.log('profile', profile);
		}
	)
);
// passport gives express the idea of how to handle auth
// inform passport library how to use GoogleStrategy
// new GoogleStrategy is an instance on authenticating users with google
