const express = require('express');
const _ = require('lodash');
const { User } = require('../models/user');
const { authenticate } = require('../middleware/authenticate');

const userRouter = express.Router();

userRouter.post('/', (req, res) => {
	const body = _.pick(req.body, ['email', 'password']);
	const user = new User(body);
	user.save().then(() => user.generateAuthToken())
		.then((token) => {
			res.header('x-auth', token).send(user);
		})
		.catch(e => res.status(400).send(e));
});

userRouter.get('/me', authenticate, (req, res) => {
	res.send(req.user);
});

userRouter.post('/login', (req, res) => {
	const body = _.pick(req.body, ['email', 'password']);
	User.findByCredentials(body.email, body.password).then((user) => {
		user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		});
	}).catch((e) => {
		res.status(400).send(e);
	});
});

userRouter.delete('/me/token', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(
		() => {
			res.status(200).send();
		},
		() => {
			res.status(400).send();
		},
	);
});

module.exports = userRouter;
