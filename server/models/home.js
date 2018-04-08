/* eslint-disable no-tabs */
const mongoose = require('mongoose');

const Home = mongoose.model('Home', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
	},
});

module.exports = { Home };
