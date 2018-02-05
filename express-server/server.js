//Setup taken from https://scotch.io/tutorials/create-a-mean-app-with-angular-2-and-docker-compose

//Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongo = require('connect-mongo');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const expressValidator  = require('express-validator');

const passportConfig = require("./config/passport");

// Get our API routes
const api = require('./routes/api');
const user = require('./routes/user.route');
const participant = require('./routes/participant.route');
const resource = require('./routes/resource.route');
const casefile = require('./routes/casefile.route');

const MongoStore = mongo(session);

// Load environment variables from .env file
const dotenv = require('dotenv').config();
const app = express();

//Connect to mongo
const mongoUrl = process.env.MONGOLAB_URL;

mongoose.connect(mongoUrl, {}).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: mongoUrl,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//all urls with /api must be authenticated
app.use('/api', passportConfig.isAuthenticated);

// Set our api routes
app.use('/api', api);
app.use('/user', user);
app.use('/api/participant', participant);
app.use('/api/resource', resource);
app.use('/api/casefile', casefile);


// Server public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "/public", "index.html"));
});


/**
* Get port from environment and store in Express.
*/
const port = process.env.PORT || '3000';
app.set('port', port);

/**
* Create HTTP server.
*/
const server = http.createServer(app);

/**
* Listen on provided port, on all network interfaces.
*/
server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = app;