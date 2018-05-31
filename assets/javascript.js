

// Street Sweeping API

$.ajax({
    url: "https://data.lacity.org/resource/x8i3-2x54.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "aWDcPjXSGOOSmKIk1wuZzfykV"
    }
}).done(function(data) {
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
});


// google maps GeoLocation API
var queryMapURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAnuOLy1xpmpNsIvSH165kWQYKAvlQqnz4"

$.ajax({
    url: queryMapURL,
    method: "GET"

}).then(function(response) {
    console.log(response)
});


