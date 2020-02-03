const express = require('express');

const Router = require('./routes/router');

const app = express();

app.use('/', Router);

module.exports = app;
