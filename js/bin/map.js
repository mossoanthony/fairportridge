var mapStyles = [
  {"featureType": "poi","stylers": [{"visibility": "simplified"}]},
  {"featureType": "road","elementType": "labels","stylers": [{"visibility": "simplified"}]},
  {"featureType": "water","stylers": [{"visibility": "simplified"}]},
  {"featureType": "transit","stylers": [{"visibility": "simplified"}]},
  {"featureType": "landscape","stylers": [{"visibility": "simplified"}]},
  {"featureType": "road.highway","stylers": [{"visibility": "simplified"}]},
  {"featureType": "road.local","stylers": [{"visibility": "on"}]},
  {"featureType": "road.highway","elementType": "geometry","stylers": [{"visibility": "on"}]},
  {"featureType": "water","stylers": [{"color": "#84afa3"},{"lightness": 52}]},
  {"stylers": [{"saturation": -17},{"gamma": 0.36}]},
  {"featureType": "transit.line", "elementType": "geometry","stylers": [{"color": "#3f518c"}]}
];

var map;
var infowindow;
var fairport = { lat: 42.186039, lng: -76.855548 };

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: fairport,
    zoom: 12,
    styles: mapStyles,
    mapTypeControl: false,
  });

  // Fairport Ridge Marker
  var marker = new google.maps.Marker({
    position: fairport,
    map: map,
    icon: {url: "img/place.svg", scaledSize: new google.maps.Size(36, 36)}
  });

  var leftPanel = document.getElementById('left-panel');
  map.controls[google.maps.ControlPosition.LEFT_CENTER].push(leftPanel);
  var service = new google.maps.places.PlacesService(map);
  infowindow =  new google.maps.InfoWindow();
  service.textSearch({
    location: fairport,
    radius: 1,
    type: ['point_of_interest'],
    query: 'golfing'
  }, function(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      return;
    }
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i], bounds);
    }
    map.fitBounds(bounds);
  });

  // TODO
  // Add a function that takes in a string that fetches results via textSearch or nearbySearch
  // Get on enter of #map-search and on click of #search-btn and link hook them up to the function above

  // Add custom UI to map
  // var input = document.getElementById('map-input');
  // var searchBox = new google.maps.places.SearchBox(input);
  //
  // var placesControlDiv = document.getElementById('placesDiv');
  // var placesControl = new PlacesControl(map);
  //
  // map.controls[google.maps.ControlPosition.LEFT_CENTER].push(placesControlDiv);
  //
  // // Add listeners to help with things
  // map.addListener('bounds_changed', function() {
  //   searchBox.setBounds(map.getBounds());
  // });
  // var markers = [];
  // searchBox.addListener('places_changed', function() {
  //   var places = searchBox.getPlaces();
  //   console.log(places);
  //   if (places.length == 0) {
  //     return;
  //   }
  //
  //   // Clear out the old markers.
  //   markers = [];
  //
  //   // For each place, get the icon, name and location.
  //   var bounds = new google.maps.LatLngBounds();
  //
  //   places.forEach(function(place) {
  //     if (!place.geometry) {
  //       console.log("Returned place contains no geometry");
  //       return;
  //     }
  //     var icon = {
  //       url: place.icon,
  //       size: new google.maps.Size(71, 71),
  //       origin: new google.maps.Point(0, 0),
  //       anchor: new google.maps.Point(17, 34),
  //       scaledSize: new google.maps.Size(25, 25)
  //     };
  //
  //     // Create a marker for each place.
  //     markers.push(new google.maps.Marker({
  //       map: map,
  //       icon: icon,
  //       title: place.name,
  //       position: place.geometry.location
  //     }));
  //
  //     if (place.geometry.viewport) {
  //       // Only geocodes have viewport.
  //       bounds.union(place.geometry.viewport);
  //     } else {
  //       bounds.extend(place.geometry.location);
  //     }
  //   });
  //   map.fitBounds(bounds);
  // });
}

function createMarker(place, bounds) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {url: place.icon, scaledSize: new google.maps.Size(24, 24)}
  });

  if (place.geometry.viewport) {
    bounds.union(place.geometry.viewport);
  } else {
    bounds.extend(place.geometry.location);
  }

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

// function placesChanged() {
//
// }
//
// function search(type, location) {
//   // TODO: Implement nearbySearch to be able to display many different kinds of icons/types of places
//   var request = {
//     location: fairport,
//     rankBy: google.maps.places.RankBy.DISTANCE,
//     type: ['restaurant']
//   };
//
//   infowindow =  new google.maps.InfoWindow();
//   var service = new google.maps.places.PlacesService(map);
//
//   service.nearbySearch(request, function(results, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//       for (var i = 0; i < results.length; i++) {
//
//         var place = results[i];
//         createMarker(results[i]);
//       }
//     }
//   });
// }
//
// function createMarker(place, icon) {
//   var placeLoc = place.geometry.location;
//   var marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location,
//     icon: icon //{url: "img/place.svg", scaledSize: new google.maps.Size(36, 36)}
//   });
//
//   google.maps.event.addListener(marker, 'click', function() {
//     infowindow.setContent(place.name);
//     infowindow.open(map, this);
//   });
// }

// function PlacesControl(map) {
//   var radButtons = document.getElementById('placesUI').children;
//   console.log(radButtons);
//   for (i = 0; i < radButtons.length; i++) {
//     radButtons[i].addEventListener('click', function(type) {
//       console.log('type', type);
//     });
//   }
// }

// function PlacesControl(map) {
//   document.getElementById('placesUI').addEventListener('click', onClick);
// }
//
// function onClick(obj) {
//   var key = obj.target.value;
//   if (key == undefined) {
//     return;
//   }
//   if (obj.target.id == "map-input") {
//
//   }
//   console.log(obj.target);
// }
