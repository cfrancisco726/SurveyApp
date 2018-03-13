// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV) {
	// we are in production - return the prod set of keys
} else {
	// we are in development - return the dev set of keys
	module.exports = require('./dev');
}
