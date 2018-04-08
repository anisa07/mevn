/* eslint-disable no-tabs */
const mongoose = require('mongoose');

let Home = mongoose.model('Home', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	}
});

module.exports = { Home };
