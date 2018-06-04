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

    // Creating sign out button
    var navBar = $(".navbar-nav");
    var signOutLi = $("<li class='nav-item'>")
    var signOutLink = $("<a class='nav-link' href='#' onclick='signOut();'>").text("Sign Out");

    navBar.append(signOutLi);
    signOutLi.append(signOutLink);
};

// Google Sign Out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    // Shows sign in message
    $(".dashboard-message").show();
      $(".dashboard").empty();
    console.log('User signed out.');
  });
window.onload = function() {
    // Check to see if the browser supports the GeoLocation API.
    if (navigator.geolocation) {

    } else {
  // Print out a message to the user.
  document.write('Your browser does not support GeoLocation');
    }
  }
}
// Get the location
// navigator.geolocation.getCurrentPosition(function(position) {
//     var lat = position.coords.latitude;
//     var lon = position.coords.longitude;
// });
//     getCurrentPosition(lat, lon);



    // Street Sweeping API
$.ajax({
    url: "https://data.lacity.org/resource/x8i3-2x54.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "aWDcPjXSGOOSmKIk1wuZzfykV"
    }
}).done(function(data) {
 console.log("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
});


// var user = "";
// // var userLocation = "";

    


// google maps GeoLocation API
var queryMapURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=https://maps.googleapis.com/maps/api/js?key=AIzaSyA839aGT61kMQtDkbhJzsbjbrxPxm4b_Ac"

    $.ajax({
        url: queryMapURL,
        method: "POST"
    
    }).then(function(response) {
        console.log(response)
        console.log('user\'s location is: ', response) 
       

    });

