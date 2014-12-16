
var directionsDisplay;
var map;
var directionsService;

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    center: new google.maps.LatLng(38.914873, -77.060494),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.NORMAL
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
directionsService = new google.maps.DirectionsService();
    var capitalLogo = 'http://i.imgur.com/tfuTdYg.png';

    for (i = 0; i < stations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(stations[i][0], stations[i][1]),
        icon: capitalLogo,
        map: map
      });

  }
}


function calcRoute() {
  var start = startTrip;
  var end = endTrip;
  var waypts = [];
  var radioArray =$('.active input');
  for (var i = 0; i < radioArray.length; i++) {
      waypts.push({
          location:radioArray[i].value,
          stopover:true});
  }

  var request = {
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.BICYCLING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      var summaryPanel = document.getElementById('directions_panel');
      // summaryPanel.innerHTML = '';
      // // For each route, display summary information.
      // for (var i = 0; i < route.legs.length; i++) {
      //   var routeSegment = i + 1;
      //   summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
      //   summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
      //   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
      //   summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      // }
    }
  });
}

$(document).ready(initialize);
$(document).on('page:load', initialize);