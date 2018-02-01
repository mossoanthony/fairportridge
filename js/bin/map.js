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

var map, infowindow, service;
var markers = [];
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

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent("Fairport Ridge Aparments");
    infowindow.open(map, this);
  });

  var leftPanel = document.getElementById('left-panel');
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(leftPanel);
  service = new google.maps.places.PlacesService(map);
  infowindow =  new google.maps.InfoWindow();

  search('Restaurants');

  var searchBtn = document.getElementById('search-btn');
  if (searchBtn.addEventListener) {                // For all major browsers, except IE 8 and earlier
    searchBtn.addEventListener("click", onBtnClick);
  } else if (searchBtn.attachEvent) {              // For IE 8 and earlier versions
    searchBtn.attachEvent("onclick", onBtnClick);
  }

  var mapSearch = document.getElementById("map-search");
  mapSearch.addEventListener("keyup", function(event) {
    console.log(event);
    if (event.key === "Enter") {
      onBtnClick();
    }
  });
}

function onBtnClick() {
  search(document.getElementById('map-search').value);
}

function createMarker(place, bounds) {
  marker = new google.maps.Marker({
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

  markers.push(marker);
}

function search(query) {
  // nearbySearch might be better
  service.nearbySearch({ //service.textSearch
    location: fairport,
    radius: 3000,
    type: ['point_of_interest'],
    keyword: query // query: query
  }, function(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      return;
    }
    deleteMarkers();
    var bounds = new google.maps.LatLngBounds().extend(fairport);

    for (var i = 0; i < results.length; i++) {
      createMarker(results[i], bounds);
    }
    map.fitBounds(bounds);
  });
}

function deleteMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}
