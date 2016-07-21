var path = require('path');
var express = require('express');

var templates = {
	app: path.join(__dirname, '../static/app/app.html')
};

module.exports = function (app) {

	app.all('*', function (req, res, next) {

		console.log(req.method.toUpperCase(), req.url);

		next();

	});

	app.get('/', function (req, res, next) {

		if (req.session.user) {

			res.sendFile(templates.app);

		} else {

			res.sendFile(templates.app);

		}

	});

};