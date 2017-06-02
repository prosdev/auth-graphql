const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/authService');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');
const config = require('../config');

const app = express();
const MongoURI = config.mongoURL;

mongoose.Promise = global.Promise;
mongoose.connect(MongoURI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    url: MongoURI,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
