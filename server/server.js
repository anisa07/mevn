/* eslint-disable indent,no-tabs */
const express = require('express');
const bodyParser = require('body-parser');

// eslint-disable-next-line no-unused-vars
const mongoose = require('./db/mongoose');
const { Home } = require('./models/home');

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());

app.post('/home', (req, res) => {
	const home = new Home({
		text: req.body.text,
	});
	home.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/home', (req, res) => {
	Home.find().then((data) => {
		res.send({ data })
	}), (e) => {
		res.status(400).send(e);
	}
});

app.listen(port, () => {
});

module.exports = { app };
