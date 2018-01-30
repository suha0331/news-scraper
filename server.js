// Dependencies
var bodyParser = require("body-parser")
var express = require("express");
var mongoose = require('mongoose');
var request = require("request");
var cheerio = require("cheerio");

var PORT = process.env.PORT || 3000;
var app = express();


// Body Parser
app.use(bodyParser.urlencoded({
    extended: false
}));

// Serve static content
app.use(express.static("public"));

// // Set Handlebars
// var exphbs = require("express-handlebars");
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

app.use(express.static('public'));

var databaseUri = 'mongodb://heroku_l9zkt5qb:5m9bc2kbon58lcrn709u7aa9gj@ds143132.mlab.com:43132/heroku_l9zkt5qb';

if(process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
} else {
	mongoose.connect(databaseUri);
}

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
