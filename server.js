// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request =require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Require History Schema
var History = require("./models/History");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/week18day3mongoose");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
// A GET request to scrape the echojs website
// app.get("/scrape", function(req, res) {

//   console.log("Scrape reached");
//   // First, we grab the body of the html with request
//   request("https://www.nytimes.com/", function(error, response, html) {
//     // Then, we load that into cheerio and save it to $ for a shorthand selector
//     var $ = cheerio.load(html);
//     // Now, we grab every h2 within an article tag, and do the following:
//     $("article h2").each(function(i, element) {

//       if($(this).children("a").text() && $(this).children("a").attr("href"))
//       {
//         // Save an empty result object
//         var result = {};

//         // Add the text and href of every link, and save them as properties of the result object
//         result.title = $(this).children("a").text();
//         result.link = $(this).children("a").attr("href");


//         console.log("HAHAHA Element: ")
//         console.log(element);
//         console.log("HEHEHE child text");
//         console.log($(this).children("a").text());

//         console.log("Result title: " + result.title);
//         console.log("Result link: " + result.link);

//         // Using our Article model, create a new entry
//         // This effectively passes the result object to the entry (and the title and link)
//         var entry = new History(result);

//         // Now, save that entry to the db
//         entry.save(function(err, doc) {
//           // Log any errors
//           if (err) {
//             console.log(err);
//           }
//           // Or log the doc
//           else {
//             console.log(doc);
//           }
//         });
//       }
//       });
//     });

//   // Tell the browser that we finished scraping the text
//   res.send("Scrape Complete");
// });

// This will get the articles we scraped from the mongoDB
app.get("/api", function(req, res) {

  // This GET request will search for the latest clickCount
  Router.find({}).exec(function(err, doc) {

    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// This is the route we will send POST requests to save each click.
// We will call this route the moment the "click" or "reset" button is pressed.
app.post("/api", function(req, res) {

  // var clickID = req.body.clickID;
  // var clicks = parseInt(req.body.clicks);
  // var 

  // Note how this route utilizes the findOneAndUpdate function to update the clickCount
  // { upsert: true } is an optional object we can pass into the findOneAndUpdate method
  // If included, Mongoose will create a new document matching the description if one is not found
  Router.findOneAndUpdate({
   title: title
  }, {
    $set: {
      title: title
    }
  }, { upsert: true }).exec(function(err) {

    if (err) {
      console.log(err);
    }
    else {
      res.send("Updated route!");
    }
  });
});

// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});