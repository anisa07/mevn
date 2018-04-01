/* eslint-disable no-tabs */
const mongoose = require('mongoose');

const Home = mongoose.model('Home', {
  text: {
    type: String,
  },
});

module.exports = { Home };
