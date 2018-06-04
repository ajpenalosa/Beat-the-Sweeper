// Google Sign-In
function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());
  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
  console.log(profile);

  // Dashboard

  // Hides sign in message
  $(".dashboard-message").hide();

  // Reference to dashboard div
  var dashboard = $(".dashboard");

  // Creating user info row
  var userInfoRow = $("<div class='row'>");

  // Creating profile image column
  var imageColumn = $("<div class='col-sm-2 text-center'>");
  var image = $("<img>").attr("src", profile.getImageUrl());

  // Appending profile image column to dashboard
  userInfoRow.append(imageColumn);
  imageColumn.append(image);
  dashboard.append(userInfoRow);

  // Creating user info column
  var userInfoColumn = $("<div class='col-sm-10'>");
  var fullNameP = $("<p>");
  fullNameP.text("Name: " + profile.getName());
  var userEmailP = $("<p>");
  userEmailP.text("E-Mail: " + profile.getEmail());

  // Appending user info column to row
  userInfoRow.append(userInfoColumn);
  userInfoColumn.append(fullNameP, userEmailP);

  // Shows sign-out button
  $(".sign-out-link").show();

  // Shows map
  $("#map").show();

}; // End of Google Sign-In function

// Hides sign-out button
$(".sign-out-link").hide();

// Hides map
$("#map").hide();

// Google Sign-Out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    // Hides sign-out button
    $(".sign-out-link").hide();
    // Shows sign in message
    $(".dashboard-message").show();
    $(".dashboard").empty();
    // Hides map
    $("#map").hide();
    console.log('User signed out.');
  });
}; // End of Google Sign-Out function

// Geolocation Map

var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 16
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      console.log("Latitude: " + position.coords.latitude);
      console.log("Longitude: " + position.coords.longitude);

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

// Load jQuery when document is ready
$(document).ready(function() {

  // Street Sweeping API
  $.ajax({
    url: "https://data.lacity.org/resource/x8i3-2x54.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "aWDcPjXSGOOSmKIk1wuZzfykV"
    }
  }).done(function(data) {
    console.log(data);
  });

  window.onload = function() {
    // Check to see if the browser supports the GeoLocation API.
    if (navigator.geolocation) {

    } else {
      // Print out a message to the user.
      document.write('Your browser does not support GeoLocation');
    }
  }

  // GeoLocation Key
  var geoKey = "AIzaSyAukbl8htJlAWFaLaIv4UC-wJ54RzgZtRs"

  // Google Maps GeoLocation API
  var queryMapURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + geoKey;

  $.ajax({
    url: queryMapURL,
    method: "POST"
  }).then(function(response) {
    console.log('user\'s location is: ', response);   
  });
  
}); // End of Document.ready
