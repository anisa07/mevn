/* eslint-disable indent,no-tabs */
const express = require('express');
const bodyParser = require('body-parser');

// eslint-disable-next-line no-unused-vars
const mongoose = require('./db/mongoose');
const Home = require('./models/home');

const app = express();
app.use(bodyParser.json());

app.post('/home', (req, res) => {
	const text = new Home({
		text: req.body.text,
	});
	text.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.listen(3000, () => {
});
