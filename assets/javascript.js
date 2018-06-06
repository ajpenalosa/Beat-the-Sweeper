var contentWindowWrapper = $("#content-window-wrapper");
var mapWrapper = $("#map-wrapper");
var mapDiv = $("#map");
var contentWindowDiv = $("#content-window");

contentWindowWrapper.hide();



var geoName = "";

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
  
 
  geoName = profile.getName();

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

  // Map styles
  var styledMapType = new google.maps.StyledMapType(
    [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ],
    {name: 'Styled Map'});

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
              'styled_map']
    }
  });

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  console.log("This is the google map");
  console.log(google.maps);
  
  // Manually creating polygon
  // Define the LatLng coordinates for the polygon's path.
  var route14P198Coordinates = [
    {lat: 34.0614769, lng: -118.4381533},
    {lat: 34.0605526, lng: -118.441844},
    {lat: 34.0599126, lng: -118.4434319},
    {lat: 34.0594504, lng: -118.4429169},
    {lat: 34.0585971, lng: -118.4422731},
    {lat: 34.0573527, lng: -118.4421444},
    {lat: 34.0569972, lng: -118.442874},
    {lat: 34.0562505, lng: -118.4424019},
    {lat: 34.0497437, lng: -118.4369946},
    {lat: 34.0509527, lng: -118.4340334},
    {lat: 34.0556461, lng: -118.4379816},
    {lat: 34.0562861, lng: -118.4370804},
    {lat: 34.0576727, lng: -118.4369516},
    {lat: 34.0587038, lng: -118.4374666},
    {lat: 34.0602681, lng: -118.4379816},
    {lat: 34.0614769, lng: -118.4381533}
  ];

  // Route 14P198
  var route14P198 = new google.maps.Polygon({
    paths: route14P198Coordinates,
    strokeColor: '#FF0000',
    strokeOpacity: 0,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0,
    route: "14P198"
  });

  route14P198.setMap(map);

  // Importing route polygons
  map.data.loadGeoJson('assets/routes.json');

  console.log("This is map.data");
  console.log(map.data);

  console.log("This is the google map after importing the polygons");
  console.log(google.maps);

  $(".close-window").on("click", function() {
    // Hides content wrapper for results
    contentWindowWrapper.hide();
    // Changes class of map wrapper
    mapWrapper.removeClass("col-sm-8").addClass("col-sm-12");
  });

  // When the user clicks display results to the right side of the map
  map.data.addListener('click', function(event) {

    // Empties content window
    contentWindowDiv.empty();

    console.log("This is the event");
    console.log(event);

    // Shows content wrapper for results
    contentWindowWrapper.show();
    // Changes class of map wrapper
    mapWrapper.removeClass("col-sm-12").addClass("col-sm-8");

    // Grab route property of polygon and puts it in a variable
    var searchInput = event.feature.getProperty('Route');
    console.log("This is the route number: " + searchInput);
    var queryURL = "https://data.lacity.org/resource/x8i3-2x54.json?$q=" + searchInput;

    // Call the Street Sweeping API
    $.ajax({
      url: queryURL,
      type: "GET",
      data: {
        "$limit" : 5000,
        "$$app_token" : "aWDcPjXSGOOSmKIk1wuZzfykV"
      }
    }).done(function(data) {

      for ( var i = 0; i < data.length; i++) {
        var boundaries = data[i].boundaries;
        var councilDistrict = data[i].cd;
        var routeNo = data[i].route_no;
        var timeEnd = data[i].time_end;
        var timeStart = data[i].time_start;
        
        var resultDiv = $("<div>");
        resultDiv.html(
          "<p><strong>Boundaries:</strong> " + boundaries + "<br />" + 
          "<strong>Council District:</strong> " + councilDistrict + "<br />" + 
          "<strong>Route Number:</strong> " + routeNo + "<br />" + 
          "<strong>Time:</strong> " + timeStart + " to " + timeEnd + "</p>"
        );

        contentWindowDiv.append(resultDiv);
      }
    });

  }); // End of event listener

  $("#info-box").on("click", ".close-window", function() {
    $("#info-box").animate({left: "-200px"});
  });

  // When the user hovers, tempt them to click by outlining the letters.
  map.data.addListener('mouseover', function(event) {
    $("#info-box").show();
    map.data.revertStyle();
    map.data.overrideStyle(event.feature, {fillColor: "#CF0000", strokeWeight: 4,fillOpacity: 0.6});
    $("#map").append($("#info-box"));
    $("#info-box").html("<i class='fas fa-times-circle close-window'></i><p><strong>Route #:</strong> " + event.feature.getProperty('Route')).animate({left: "40px"});
  });

  map.data.addListener('mouseout', function(event) {
    map.data.revertStyle();
  });

  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: 34.0591149, // position.coords.latitude,
        lng: -118.4411627 // position.coords.longitude
      };

      var contentString = "<p><strong>Name:</strong> " + 
        geoName +
        "</p>" +
        "<div id='map-window'>You Beat the Sweeper!</div>";

      // Detects if geolocation is in the polygon
      var point = new google.maps.LatLng(34.0591149, -118.4411627);

      if (google.maps.geometry.poly.containsLocation( point, route14P198 )) {
        console.log("This is in the polygon");

        // Call the Street Sweeping API

        // Grab route property of polygon and puts it in a variable
        var searchInput = route14P198.route;
        var queryURL = "https://data.lacity.org/resource/x8i3-2x54.json?$q=" + searchInput;

        $.ajax({
          url: queryURL,
          type: "GET",
          data: {
            "$limit" : 5000,
            "$$app_token" : "aWDcPjXSGOOSmKIk1wuZzfykV"
          }
        }).done(function(data) {

          $(document).find("#map-window").empty();

          for ( var i = 0; i < data.length; i++) {
            var boundaries = data[i].boundaries;
            var councilDistrict = data[i].cd;
            var routeNo = data[i].route_no;
            var timeEnd = data[i].time_end;
            var timeStart = data[i].time_start;
            
            var resultDiv = $("<div>");
            resultDiv.html(
              "<p><strong>Boundaries:</strong> " + boundaries + "<br />" + 
              "<strong>Council District:</strong> " + councilDistrict + "<br />" + 
              "<strong>Route Number:</strong> " + routeNo + "<br />" + 
              "<strong>Time:</strong> " + timeStart + " to " + timeEnd + "</p>"
            );

            $(document).find("#map-window").append(resultDiv);
          }
        });
      }
      else {
        console.log("You beat the sweeper!");
      }

      console.log("Latitude: " + position.coords.latitude);
      console.log("Longitude: " + position.coords.longitude);

      infoWindow.setPosition(pos);
      infoWindow.setContent(contentString);
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

  // Search Page
  $("#search-submit").on("click", function(event) {
    event.preventDefault();

    $(".search-results").empty();

    var searchInput = $("#search-input").val();
    var queryURL = "https://data.lacity.org/resource/x8i3-2x54.json?$q=" + searchInput;

    // Street Sweeping API
    $.ajax({
      url: queryURL,
      type: "GET",
      data: {
        "$limit" : 5000,
        "$$app_token" : "aWDcPjXSGOOSmKIk1wuZzfykV"
      }
    }).done(function(data) {
      console.log(data);
      console.log(data[0].boundaries);

      var numberOfResults = $("<div class='results-message'>").html("<h2>" + data.length + " Results</h2>");

      $(".search-results").append(numberOfResults);

      for ( var i = 0; i < data.length; i++) {
        var boundaries = data[i].boundaries;
        var councilDistrict = data[i].cd;
        var routeNo = data[i].route_no;
        var timeEnd = data[i].time_end;
        var timeStart = data[i].time_start;
        
        var resultDiv = $("<div class='search-item'>");
        resultDiv.html(
          "<p><strong>Boundaries:</strong> " + boundaries + "<br />" + 
          "<strong>Council District:</strong> " + councilDistrict + "<br />" + 
          "<strong>Route Number:</strong> " + routeNo + "<br />" + 
          "<strong>Time:</strong> " + timeStart + " to " + timeEnd + "</p>"
        );

        $(".search-results").append(resultDiv);
      }
    });
  });
  
}); // End of Document.ready
