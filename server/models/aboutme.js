/* eslint-disable no-tabs */
const mongoose = require('mongoose');

const AboutMe = mongoose.model('AboutMe', {
	icon: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
	},
	title: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
	},
	text: [{
		type: String,
		required: true,
		minlength: 1,
		trim: true,
	}],
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
});

module.exports = { AboutMe };
