/*
function initMap() {
  var uluru = { lat: -25.363, lng: 131.044 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
*/
/*
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 36.964, lng: -122.015},
    zoom: 18,
    mapTypeId: 'satellite'
  });
  map.setTilt(45);
}
*/

var map;

function initMap() {
  var fairport = {lat: 42.137858, lng: -76.985960};
  map = new google.maps.Map(document.getElementById('map'), {
    center: fairport,
    zoom: 12,
  });
  var marker = new google.maps.Marker({
    position: fairport,
    map: map
  });
}

function rotate90() {
  var heading = map.getHeading() || 0;
  map.setHeading(heading + 90);
}

function autoRotate() {
  // Determine if we're showing aerial imagery.
  if (map.getTilt() !== 0) {
    window.setInterval(rotate90, 3000);
  }
}
