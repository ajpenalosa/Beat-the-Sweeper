window.onload = function() {
    // Check to see if the browser supports the GeoLocation API.
if (navigator.geolocation) {

} else {
  // Print out a message to the user.
  document.write('Your browser does not support GeoLocation');
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


// function ipLookUp () {
//     $.ajax('https://ip-api.com/json')
//     .then(
//         function success(response) {
//             console.log('User\'s Location Data is ', response);
//             console.log('User\'s Country', response.country);
//             getAdress(response.lat, response.lon)
//   },
  
//         function fail(data, status) {
//             console.log('Request failed.  Returned status of',
//                         status);
//         }
//     );
//   }

// google maps GeoLocation API
var queryMapURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCLkhpxn8Q2ZAg203qBCwUS_COo28uI1x4"

// userLocation = function getLocation() {
    $.ajax({
        url: queryMapURL,
        method: "POST"
    
    }).then(function(response) {
        console.log(response)
        console.log('user\'s location is: ', response)    
    });

}


//     getLocation();
// };    



//     function fail (status) {
//         console.log('Request failed.  Returned status of', status)
// }
//     if ("geolocation" in navigator) {
//     // check if geolocation is supported/enabled on current browser
//     navigator.geolocation.getCurrentPosition(
//      function success(position) {
//        // for when getting location is a success
//        console.log('latitude', position.coords.latitude, 
//                    'longitude', position.coords.longitude);
//        getAddress(position.coords.latitude, 
//                   position.coords.longitude)
//      },
//     function error(error_message) {
//       // for when getting location results in an error
//       console.error('An error has occured while retrieving' +
//                     'location', error_message)
//       ipLookUp()
    
//   }); 
//     } 
//     else {
//     // geolocation is not supported
//     // get your location some other way
//     console.log('geolocation is not enabled on this browser')
//     ipLookUp();
//   };




  
//   function getAddress (latitude, longitude) {
//     $.ajax(
//         'https://www.googleapis.com/geolocation/v1/geolocate?' +
//             'latlng=' + latitude + ',' + longitude + '&key=' + 
//             'AIzaSyCLkhpxn8Q2ZAg203qBCwUS_COo28uI1x4')     

//     .then(
//       function success (response) {
//         console.log('User\'s Address Data is ', response)
//       },
//       function fail (status) {
//         console.log('Request failed.  Returned status of',
//                     status)
//       }
//      )
//   }
  
//   if ("geolocation" in navigator) {
//     // check if geolocation is supported/enabled on current browser
//     navigator.geolocation.getCurrentPosition(
//      function success(position) {
//        // for when getting location is a success
//        console.log('latitude', position.coords.latitude, 
//                    'longitude', position.coords.longitude);
//        getAddress(position.coords.latitude, 
//                   position.coords.longitude)
//      },
//     function error(error_message) {
//       // for when getting location results in an error
//       console.error('An error has occured while retrieving' +
//                     'location', error_message)
//       ipLookUp()
    
//   }); 
// } else {
//     // geolocation is not supported
//     // get your location some other way
//     console.log('geolocation is not enabled on this browser')
//     ipLookUp()
//   }



// var map;
// var mark;
// var initialize = function() {
//   map  = new google.maps.Map(document.getElementById('map-canvas'), {center:{lat:lat,lng:lng},zoom:12});
//   mark = new google.maps.Marker({position:{lat:lat, lng:lng}, map:map});
// };
// window.initialize = initialize;

// var redraw = function(payload) {
//     lat = payload.message.lat;
//     lng = payload.message.lng;
//     map.setCenter({lat:lat, lng:lng, alt:0});
//     mark.setPosition({lat:lat, lng:lng, alt:0});
//   };


// button.onclick = function() {
//     var startPos;
//     var nudge = document.getElementById("nudge");
  
//     var showNudgeBanner = function() {
//       nudge.style.display = "block";
//     };
  
//     var hideNudgeBanner = function() {
//       nudge.style.display = "none";
//     };
  
//     var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);
  
//     var geoSuccess = function(position) {
//       hideNudgeBanner();
//       // We have the location, don't display banner
//       clearTimeout(nudgeTimeoutId);
  
//       // Do magic with location
//       startPos = position;
//       document.getElementById('startLat').innerHTML = startPos.coords.latitude;
//       document.getElementById('startLon').innerHTML = startPos.coords.longitude;
//     };
//     var geoError = function(error) {
//       switch(error.code) {
//         case error.TIMEOUT:
//           // The user didn't accept the callout
//           showNudgeBanner();
//           break;
//       }
//       // check for Geolocation support
//     if (navigator.geolocation) {
//     console.log('Geolocation is supported!');
//   }
//     else {
//     console.log('Geolocation is not supported for this Browser/OS.');
//   }
//     };
  
//     navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
//   };



// window.onload = function() {
//     var startPos;
//     var geoSuccess = function(position) {
//       startPos = position;
//       document.getElementById('startLat').innerHTML = startPos.coords.latitude;
//       document.getElementById('startLon').innerHTML = startPos.coords.longitude;
//     };
//     navigator.geolocation.getCurrentPosition(geoSuccess);
//   };

