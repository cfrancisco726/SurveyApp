const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
// give us access to cookies
const passport = require('passport');
// tells passport to make use of cookiea
require('./models/User');
require('./services/passport');
// need to require passport to atleast 1 location or else wont get executed

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
	// each app.use wires up middleware
	// middleware - functions that modify incoming request to our app before theyre sent off to route handlers
	cookieSession({
		maxAge: 30 * 24 * 60 * 1000,
		keys: [keys.cookieKey]
		// allows to provide multiple keys
		// enables cookies
	})
);

app.use(passport.initialize());
app.use(passport.session());
// both tells passport to use cookies

require('./routes/authRoutes')(app);
// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);
// immediately invoked function
// refactored authRoutes

const PORT = process.env.PORT || 5000;
// environment variables that are set in the underlying runtime that node is running on top of
// herokus oppportunity to send us runtime configuration after we deploy
// if heroku is running our app in production then we can freely use process.env.PORT
// if in dev env like on our machines then that variable might not be defined
// 5000 for dev

app.listen(PORT);
