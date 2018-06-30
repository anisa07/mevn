/* eslint-disable no-tabs,eol-last */
const mongoose = require('mongoose');

const ExperiencePersonal = mongoose.model('ExperiencePersonal', {
	companies: [
		{
			img: { type: String, trim: true },
			link: { type: String, trim: true },
		},
	],
	profession: { type: String, required: true, trim: true },
	years: { type: String, required: true, trim: true },
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
});

const ExperienceCompany = mongoose.model('ExperienceCompany', {
	company: {
		img: { type: String, trim: true },
		link: { type: String, trim: true },
	},
	professions: [
		{ type: String, required: true, trim: true },
	],
	years: { type: String, required: true, trim: true },
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
});

const Skills = mongoose.model('Skills', {
	name: { type: String, required: true, trim: true },
	value: { type: Number, required: true, trim: true },
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
});


module.exports = { ExperiencePersonal, ExperienceCompany, Skills };
