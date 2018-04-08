/* eslint-disable indent,no-tabs */
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

// eslint-disable-next-line no-unused-vars
const mongoose = require('./db/mongoose');
const {ObjectID} = require('mongodb');
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

app.delete('/home/:id', (req, res) => {
	const id = req.params.id;
	if (!ObjectID.isValid(id)){
		return res.status(404).send(e);
	}
	Home.findByIdAndRemove(id).then((data) => {
		if (!data) {
			res.send(data);
		} else {
			res.status(400).send(e);
		}
	}).catch(e =>
		res.status(400).send(e)
	);
});

app.patch('/home/:id', (req, res) => {
	const id = req.params.id;
	const body = _.pick(req.body, ['text']);

	if (!ObjectID.isValid(id)){
		return res.status(404).send(e);
	}

	Home.findByIdAndUpdate(id, {$set: body}, {new: true})
		.then(data => {
			if (!data) {
				res.status(404).send();
			}
			res.send({data});
		}).catch(e => {
			res.status(400).send();
	});
});

app.listen(port, () => {
});

module.exports = { app };
