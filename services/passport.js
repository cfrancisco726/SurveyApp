const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

passport.serializeUser((user, done) => {
	// user is whatever we just pulled out db
	done(null, user.id);
	// callback that we have to call
	// null is an error object which would be nothing
	// user.id is not profile.id but the mongo generated id
	// can't assume everyone will have an id but we know mongo will always have an id
	// take user and turn into an id
});

passport.deserializeUser((id, done) => {
	// turn id into mongoose model instance
	// search over all users
	User.findById(id).then(user => {
		// anytime we access mongo db we have to assume it is an asynchronous action we have to assume it returns a promise after id is found
		done(null, user);
	});
});

// make sure passport is aware of our cookies

const User = mongoose.model('users');
// User object is our model class
// one argument means were trying to fetch something out of mongoose, 2 means were trying to load
// gives us relation to the model colletion
// use class to create model instance and then persist to database

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			// route the user gets sent to after they are granted permission
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });
			// find first user in class with googleid of profile.id
			// we are inititiating an asynchronous action
			// query returns a promise
			// model instance that reps the user who was found
			if (existingUser) {
				// we already have a record with a given profile ID
				return done(null, existingUser);
			}
			// null means no error, return existingUser record
			// we dont have a user record with this ID, make a new record
			const user = await new User({ googleId: profile.id }).save();
			// creates new instance of user or a mongo model instance
			// .save to persist to db
			done(null, user);
			// another model instance but both represent model
			// by convention make use of the one provided in the promise callback in case there are any changes
			// console.log('accessToken', accessToken);
			// console.log('refreshToken', refreshToken);
			// console.log('profile', profile);
		}
	)
);
// passport gives express the idea of how to handle auth
// inform passport library how to use GoogleStrategy
// new GoogleStrategy is an instance on authenticating users with google
