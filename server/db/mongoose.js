/* eslint-disable import/prefer-default-export */
const mongoose = require('mongoose');

const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/dbPPB';
mongoose.Promise = Promise;
mongoose.connect(dbUrl);

module.exports = { mongoose };
