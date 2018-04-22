/* eslint-disable indent,no-tabs,no-unused-expressions,
no-sequences,consistent-return,prefer-destructuring */
require('./config/config');
// const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

// eslint-disable-next-line no-unused-vars
const mongoose = require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());

app.use('/users', require('./routes/user.routes'));
// const myLogger = function (req, res, next) {
// 	console.log('req', req.originalUrl);
// 	console.log('req', req.method);
// 	next();
// }
// app.use(myLogger);
app.use('/pages', require('./routes/pages.routes'));

app.listen(port, () => {
});

module.exports = { app };
