// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
require('dotenv').config();
var express = require("express");
var session = require('express-session');
var bodyParser = require("body-parser");
var cookieSession = require('cookie-session');
var passportSetup = require('./config/passport-setup');
var passport = require('passport');
var keys = require('./config/keys.js');

if (process.env.JAWSDB_URL) {
  var connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8000;

// Passport set up
app.use(cookieSession({
  maxAge: 1800000,
  keys: [keys.session.cookieKey]
}));
};

app.use(passport.initialize());
// express.session();
app.use(passport.session());

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Auth routes
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes)

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/dreams-api-routes.js")(app);
require("./routes/html-api-routes.js")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
