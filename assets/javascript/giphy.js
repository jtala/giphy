//Global Variables.

var topics = ["basketball", "tennis", "track", "football", "soccer"];


// Creating the Ajax.

var sport; // User input
var queryURL="https://http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=W3a5evec5YVRfHlGQDAehOlDfcfFDo7m"

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {



});

