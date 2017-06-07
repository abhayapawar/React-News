// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
//var geocodeAPI = "35e5548c618555b1a43eb4759d26b260";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(title) {

    // console.log(location);

    // Figure out the geolocation
    var queryURL = "https://www.nytimes.com/" + title + "section/arts/design?action=click&contentCollection=Arts%2FArt%20%26%20Design&contentPlacement=2&module=SectionsNav&pgtype=Homepage&region=TopBar&version=BrowseTree" + link;
    return axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted address property
      if (response.data.results[0]) {
        return response.data.results[0].formatted;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postHistory: function(location) {
    return axios.post("/api", { title: title });
  },

  deleteHistory:function(){
    axios.delete("/api");
  }
};

// We export the API helper
module.exports = helper;
