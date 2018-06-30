/* eslint-disable no-tabs */
const mongoose = require('mongoose');

const Projects = mongoose.model('Projects', {
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
	link: {
		type: String,
		trim: true,
	},
	title2: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
	},
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
});

module.exports = { Projects };
