const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send({ bye: 'There' });
});
// route handler

const PORT = process.env.PORT || 5000;
// environment variables that are set in the underlying runtime that node is running on top off
// herokus oppportunity to send us runtime configuration after we deploy
// if heroku is running our app in production then we can freely use process.env.PORT
// if in dev env like on our machines then that variable might not be defined
// 5000 for dev

app.listen(PORT);
