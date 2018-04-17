const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
// give us access to cookies
const passport = require('passport');
// tells passport to make use of cookies
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');
// need to require passport to atleast 1 location or else wont get executed

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
// any put, post, path request with body comes in middleware above will parse and assign to req.body
app.use(
	// each app.use wires up middleware
	// middleware - functions that modify incoming request to our app before theyre sent off to route handlers
	cookieSession({
		// pulls data out of the cookie
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
// returns a function and immediately invoked
// refactored authRoutes
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	// express will serve up production assets
	// like our main.js file or main.css file
	app.use(express.static('client/build'));
	// search for file in client/build/static first


	// express will serve up the index.html file
	// if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
	// if request isnt found in the above 3 then just give them index.html file
}

const PORT = process.env.PORT || 5000;
// environment variables that are set in the underlying runtime that node is running on top of
// herokus oppportunity to send us runtime configuration after we deploy
// if heroku is running our app in production then we can freely use process.env.PORT
// if in dev env like on our machines then that variable might not be defined
// 5000 for dev

app.listen(PORT);
