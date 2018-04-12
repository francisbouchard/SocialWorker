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
const fileUpload = require('express-fileupload');

const passportConfig = require("./config/passport");
const permit = require("./config/permission");

// Get our API routes
const api = require('./routes/api');
const user = require('./routes/user.route');
const participant = require('./routes/participant.route');
const casefile = require('./routes/casefile.route');
const phonelog = require('./routes/phonelog.route');
const task = require('./routes/task.route');
const followup = require('./routes/followup.route');
const trash = require('./routes/trash.route');

const resource = require('./routes/resource.route');
const housing = require('./routes/resources/housing.route');
const medical = require('./routes/resources/medical.route');

const MongoStore = mongo(session);

// Load environment variables from .env file
const dotenv = require('dotenv').config();
const app = express();

//Connect to mongo
const mongoUrl = process.env.MONGOLAB_URL;


app.use(fileUpload());

mongoose.connect(mongoUrl, {}).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});

// Parsers for POST data
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
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

//following routes only permitted to admin users
app.use('/user/signup', permit('admin'));
app.use('/user/all', permit('admin'));
app.use('/api/participant/permanent', permit('admin'));
app.use('/api/trash', permit('admin'));

// Set our api routes
app.use('/api', api);
app.use('/user', user);
app.use('/api/participant', participant);
app.use('/api/casefile', casefile);
app.use('/api/phonelog', phonelog);
app.use('/api/task', task);
app.use('/api/followup', followup);
app.use('/api/trash', trash);

app.use('/api/resource', resource);
app.use('/api/resource/housing', housing);
app.use('/api/resource/medical', medical);

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

const io = require('socket.io').listen(server);

// Socket.io operations
io.on('connection', function(socket){
  console.log('A user has connected to the server.');

  socket.on('join', function(username) {
    // Same contract as ng-chat.User
    usersCollection.push({  
      id: socket.id, // Assigning the socket ID as the user ID in this example
      displayName: username,
      status: 0, // ng-chat UserStatus.Online,
      avatar: null
    });

    socket.broadcast.emit("userListChanged", usersCollection);

    console.log(username + " has joined the chat room.");

    // This is the user's unique ID to be used on ng-chat as the connected user.
    socket.emit("generatedUserId", socket.id);

    // On disconnect remove this socket client from the users collection
    socket.on('disconnect', function() {
      console.log('User disconnected');

      var i = usersCollection.findIndex(x => x.id == socket.id);
      usersCollection.splice(i, 1);

      socket.broadcast.emit("userListChanged", usersCollection);
   });
  });

  socket.on("sendMessage", function(message){
    console.log("Message received:");
    console.log(message);

    io.to(message.toId).emit("messageReceived", {
      user: usersCollection.find(x => x.id == message.fromId),
      message: message
    });

    console.log("Message sent.");
  });
});



module.exports = app;