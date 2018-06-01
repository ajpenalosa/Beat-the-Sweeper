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

    userInfoRow.append(userInfoColumn);
    userInfoColumn.append(fullNameP, userEmailP);

};

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


// google maps GeoLocation API
var queryMapURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAnuOLy1xpmpNsIvSH165kWQYKAvlQqnz4"

$.ajax({
    url: queryMapURL,
    method: "POST"

}).then(function(response) {
    console.log(response)
});