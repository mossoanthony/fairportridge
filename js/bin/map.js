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
  {"featureType": "transit.line", "elementType": "geometry","stylers": [{"color": "#3f518c"}]}]

var map;
var infowindow;

function initMap() {
  var fairport = { lat: 42.137858, lng: -76.985960 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: fairport,
    zoom: 12,
    styles: mapStyles
  });

  var marker = new google.maps.Marker({
    position: fairport,
    map: map,
    icon: {url: "img/place.svg", scaledSize: new google.maps.Size(36, 36)}
  });

  var request = {
    location: fairport,
    rankBy: google.maps.places.RankBy.DISTANCE,
    type: ['restaurant']
  };

  infowindow =  new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {

        var place = results[i];
        createMarker(results[i]);
      }
    }
  });
}

function search(type, location) {
  // TODO: Implement nearbySearch to be able to display many different kinds of icons/types of places
}

function createMarker(place, icon) {
  console.log(place);
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: icon //{url: "img/place.svg", scaledSize: new google.maps.Size(36, 36)}
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
