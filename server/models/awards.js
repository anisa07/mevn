/* eslint-disable no-tabs */
const mongoose = require('mongoose');

const Awards = mongoose.model('Awards', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
	},
	place: {
		type: Number,
		required: true,
	},
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
});

module.exports = { Awards };
