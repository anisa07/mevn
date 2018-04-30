/* eslint-disable no-unused-expressions,prefer-destructuring,consistent-return,indent,no-underscore-dangle */
const express = require('express');
const _ = require('lodash');
const { ObjectID } = require('mongodb');

const { Home } = require('../models/home');
const { authenticate } = require('../middleware/authenticate');

const pageRouter = express.Router();

const Pages = {
	home: Home,
};
const urls = ['home', 'blog', 'awards', 'events', 'experience', 'mentorship', 'projects', 'contacts'];
Object.freeze(Pages);
Object.freeze(urls);
const findUrl = originalUrl => urls.find(url => originalUrl.includes(url));

pageRouter.get('/*', (req, res) => {
	const url = findUrl(req.originalUrl);
	if (url) {
		const Model = Pages[url];
		Model.find().then((data) => {
			res.send({ data });
		}, (e) => {
			res.status(400).send(e);
		});
	} else {
		res.status(404).send();
	}
});

pageRouter.post('/*', authenticate, (req, res) => {
	const url = findUrl(req.originalUrl);
	if (url) {
		const Model = Pages[url];
		const model = new Model({
			text: req.body.text,
			_creator: req.user._id,
		});
		model.save().then((doc) => {
			res.send(doc);
		}, (e) => {
			res.status(400).send(e);
		});
	} else {
		res.status(404).send();
	}
});

pageRouter.delete('/*/:id', authenticate, (req, res) => {
	const url = findUrl(req.originalUrl);
	if (url) {
		const id = req.params.id;
		const Model = Pages[url];
		if (!ObjectID.isValid(id)) {
			return res.status(404).send();
		}
		Model.findOneAndRemove({ _id: id, _creator: req.user._id }).then((data) => {
			if (!data) {
				res.status(404).send(data);
			}
			res.status(200).send({ data });
		}).catch(e =>
			res.status(400).send(e));
	} else {
		res.status(404).send();
	}
});

pageRouter.patch('/*/:id', authenticate, (req, res) => {
	const url = findUrl(req.originalUrl);
	if (url) {
		const id = req.params.id;
		const Model = Pages[url];
		const body = _.pick(req.body, _.keys(req.body));

		if (!ObjectID.isValid(id)) {
			return res.status(404).send();
		}

		Model.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true })
			.then((data) => {
				if (!data) {
					res.status(404).send();
				}
				res.send({ data });
			})
			.catch((e) => {
				res.status(400).send(e);
			});
	} else {
		res.status(404).send();
	}
});

module.exports = pageRouter;
