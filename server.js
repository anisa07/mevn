/* eslint-disable no-multi-spaces,import/no-unresolved,prefer-arrow-callback */
// server.js
const express = require('express');
// const https = require('https');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

require('./server/config/config');
// eslint-disable-next-line no-unused-vars
const mongoose = require('./server/db/mongoose');

const server = express();

const fs = require('fs');
const path = require('path');
// obtain bundle
const bundle =  require('./dist/server.bundle.js');
// get renderer from vue server renderer
const renderer = require('vue-server-renderer').createRenderer({
	// set template
	template: fs.readFileSync('./index.html', 'utf-8'),
});

server.use(bodyParser.json());
server.use('/dist', express.static(path.join(__dirname, './dist')));
server.use('/users', require('./server/routes/user.routes'));
server.use('/pages', require('./server/routes/pages.routes'));

server.use(favicon(path.join(__dirname, 'favicon.ico')));

// start server
server.get('*', (req, res) => {
	bundle.default({ url: req.url }).then((app) => {
		// context to use as data source
		// in the template for interpolation
		const context = {
			title: 'IRoman blog',
			meta: `
        <meta description="Roman Iovlev's portfolio and blog">
      `,
		};

		renderer.renderToString(app, context, function (err, html) {
			if (err) {
				if (err.code === 404) {
					res.status(404).end('Page not found');
				} else {
					res.status(500).end('Internal Server Error');
				}
			} else {
				res.end(html);
			}
		});
	}, (err) => {
		console.log(err);
	});
});

// const port = 3443;
const port = process.env.PORT || 3001;

// const httpsOptions = {
// 	cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
// 	key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
// };

// https.createServer(httpsOptions, server).listen(port);

server.listen(port);

/* eslint-disable indent,no-tabs,no-unused-expressions,
no-sequences,consistent-return,prefer-destructuring */


