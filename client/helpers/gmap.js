gmaps = {
    // map object
    map: null,
 
    // google markers objects
    markers: [],
 
    // google lat lng objects
    latLngs: [],
 
    // our formatted marker data objects
    markerData: [],
 
    // add a marker given our formatted marker data object
    addMarker: function(marker) {
        var gLatLng = new google.maps.LatLng(marker.lat, marker.lng);
        var gMarker = new google.maps.Marker({
            position: gLatLng,
            map: this.map,
            title: marker.title,
            // animation: google.maps.Animation.DROP,
            icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
        this.latLngs.push(gLatLng);
        this.markers.push(gMarker);
        this.markerData.push(marker);
        return gMarker;
    },
 
    // calculate and move the bound box based on our markers
    calcBounds: function() {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, latLngLength = this.latLngs.length; i < latLngLength; i++) {
            bounds.extend(this.latLngs[i]);
        }
        this.map.fitBounds(bounds);
    },
 
    // check if a marker already exists
    markerExists: function(key, val) {
        _.each(this.markers, function(storedMarker) {
            if (storedMarker[key] == val)
                return true;
        });
        return false;
    },
 
    // intialize the map
    initialize: function() {
        console.log("[+] Intializing Google Maps...");
        var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(53.565, 10.001),
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
 
        this.map = new google.maps.Map(
            document.getElementById('map-canvas'),
            mapOptions
        );
 
        // global flag saying we intialized already
        Session.set('map', true);
    }
}

// var directionsDisplay;
// var map;
// var directionsService;

// function initialize() {
//   directionsDisplay = new google.maps.DirectionsRenderer();
//   var mapOptions = {
//     center: new google.maps.LatLng(38.914873, -77.060494),
//     zoom: 13,
//     mapTypeId: google.maps.MapTypeId.NORMAL
//   };
//   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//   directionsDisplay.setMap(map);
//   directionsService = new google.maps.DirectionsService();
//   var transitLayer = new google.maps.TransitLayer();
//     transitLayer.setMap(map);
//     // var capitalLogo = 'http://i.imgur.com/tfuTdYg.png';
//     // 
//     // for (i = 0; i < stations.length; i++) {
//     //   marker = new google.maps.Marker({
//     //     position: new google.maps.LatLng(stations[i][0], stations[i][1]),
//     //     icon: capitalLogo,
//     //     map: map
//     //   });
//     // 
//     // }
//     var train = Meteor.call("returnOneTrain");
//     var infowindow = new google.maps.InfoWindow({
//           content: train
//       });

//     marker = new google.maps.Marker({
//       position: new google.maps.LatLng(38.914873, -77.060494),
//       map: map
//     });

//     infowindow.open(map,marker);
// }


// function calcRoute() {
//   var start = startTrip;
//   var end = endTrip;
//   var waypts = [];
//   var radioArray =$('.active input');
//   for (var i = 0; i < radioArray.length; i++) {
//       waypts.push({
//           location:radioArray[i].value,
//           stopover:true});
//   }

//   var request = {
//       origin: start,
//       destination: end,
//       waypoints: waypts,
//       optimizeWaypoints: true,
//       travelMode: google.maps.TravelMode.BICYCLING
//   };
//   directionsService.route(request, function(response, status) {
//     if (status == google.maps.DirectionsStatus.OK) {
//       directionsDisplay.setDirections(response);
//       var route = response.routes[0];
//       var summaryPanel = document.getElementById('directions_panel');
//       // summaryPanel.innerHTML = '';
//       // // For each route, display summary information.
//       // for (var i = 0; i < route.legs.length; i++) {
//       //   var routeSegment = i + 1;
//       //   summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
//       //   summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
//       //   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
//       //   summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
//       // }
//     }
//   });
// }

// $(document).ready(initialize);
// $(document).on('page:load', initialize);