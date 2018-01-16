// Dependencies
var bodyParser = require("body-parser")
var express = require("express");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

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

mongoose.connect("mongodb://localhost/news-scraper");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

var routes = require('./controller/controller.js');
app.use('/', routes);

// Listen on port 3000
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("App running on PORT " + port);
});