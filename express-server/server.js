//Setup taken from https://scotch.io/tutorials/create-a-mean-app-with-angular-2-and-docker-compose

//Get dependencies
const express = require('express');
const path = require('path');
var cors = require('cors')
const http = require('http');
const bodyParser = require('body-parser');
const mongo = require('mongo');
const mongoose = require('mongoose');


// Get our API routes
const api = require('./routes/api');
const user = require('./routes/user');
const participant = require('./routes/participant.route');
const resource = require('./routes/resource.route');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
var cors = require('cors');		
app.use(cors({  		
    origin: '*',		
    withCredentials: false,		
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin' ]		
}));

// Set our api routes
app.use('/', api);
app.use('/user', user);
app.use('/participant', participant);
app.use('/resource', resource);
app.use(cors())

//Connect to mongo
const mongoUrl = 'mongodb://socialworker:soen490Whiteboard!@ds143559.mlab.com:43559/socialworker'
mongoose.connect(mongoUrl, {}).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
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