/* eslint-disable no-unused-expressions,
prefer-destructuring,consistent-return,indent,no-underscore-dangle */
const express = require('express');
const _ = require('lodash');
const { ObjectID } = require('mongodb');

const { Home } = require('../models/home');
const { Awards } = require('../models/awards');
const { AboutMe } = require('../models/aboutme');
const { ExperiencePersonal, ExperienceCompany, Skills } = require('../models/experience');
const { Projects } = require('../models/projects');
const { authenticate } = require('../middleware/authenticate');

const pageRouter = express.Router();

const Pages = {
	home: Home,
	'experience-personal': ExperiencePersonal,
	'experience-company': ExperienceCompany,
	skills: Skills,
	'about-me': AboutMe,
	projects: Projects,
	awards: Awards,
};
const urls = ['home', 'blog', 'awards', 'events', 'about-me', 'experience-personal', 'experience-company',
	'skills', 'mentorship', 'projects', 'contacts'];
Object.freeze(Pages);
Object.freeze(urls);
const findUrl = originalUrl => urls.find(url => originalUrl.includes(url));

const createInstanceModel = (req, url) => {
	const Model = Pages[url];
	if (url === 'experience-personal') {
		return new Model({
			companies: req.body.companies,
			profession: req.body.profession,
			years: req.body.years,
			_creator: req.user._id,
		});
	}
	if (url === 'experience-company') {
		return new Model({
			company: req.body.company,
			professions: req.body.professions,
			years: req.body.years,
			_creator: req.user._id,
		});
	}
	if (url === 'skills') {
		return new Model({
			name: req.body.name,
			value: req.body.value,
			_creator: req.user._id,
		});
	}
	if (url === 'about-me') {
		return new Model({
			icon: req.body.icon,
			title: req.body.title,
			text: req.body.text,
			_creator: req.user._id,
		});
	}
	if (url === 'projects') {
		return new Model({
			title: req.body.title,
			title2: req.body.title2,
			text: req.body.text,
			link: req.body.link,
			_creator: req.user._id,
		});
	}
	if (url === 'awards') {
		return new Model({
			text: req.body.text,
			place: req.body.place,
			_creator: req.user._id,
		});
	}
};


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
		const model = createInstanceModel(req, url);
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
