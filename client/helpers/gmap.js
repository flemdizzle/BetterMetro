gmaps = {
    // map object
    map: null,
 
    // google markers objects
    markers: [],
 
    // google lat lng objects
    latLngs: [],
 
    // our formatted marker data objects
    markerData: [],

    // info window array
    infoWindows: [],

    // user location
    userLocation: null,

    //user marker
    userMarker: null,
 
    // add a marker given our formatted marker data object
    addMarker: function(marker) {
        var gLatLng = new google.maps.LatLng(marker.lat, marker.lng);
        var gMarker = new google.maps.Marker({
            position: gLatLng,
            map: this.map,
            title: marker.title
            // animation: google.maps.Animation.DROP,
            // icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });

        this.latLngs.push(gLatLng);
        this.markers.push(gMarker);
        this.markerData.push(marker);

        return gMarker;

    },

    // centers map on users location and stuff
    centerMap: function(){
      var marker = new google.maps.Marker({
            position: this.userLocation,
            map: this.map,
            icon:'https://storage.googleapis.com/support-kms-prod/SNP_2752129_en_v0'
      });
      this.userMarker = marker;
    },

    // adds info windows to existing markers
    addInfoWindow: function(trainStatus){
        var gInfowindow = new google.maps.InfoWindow({
          content: trainStatus.message
        });

        this.infoWindows.push(gInfowindow);

        // this opens the info window
        gInfowindow.open(this.map, this.markers[trainStatus.markerIndex]);
    },
 
    // returns stations that are walking distance
    walkingDistanceStations: function(stationArray, callback){
      var walkingStations = [];
      for (var i = 0; i < stationArray.length; i++) {
        var stationLatLng = new google.maps.LatLng(stationArray[i].Lat, stationArray[i].Lon);
        
        //returns distance between two latlngs using google geometry library
        var result = google.maps.geometry.spherical.computeDistanceBetween(this.userLocation, stationLatLng);
        if(result < 800){
          walkingStations.push(stationArray[i]);
        }
      }
      
      callback(walkingStations);
    },

    // define zoom based on rendered markers
    markerBounds: function(){
      console.log("done");
      var bounds = new google.maps.LatLngBounds();
      bounds.extend(this.userMarker.getPosition());
      for (var i = 0; i < this.markers.length; i++) {
        bounds.extend(this.markers[i].getPosition());
      }
      this.map.fitBounds(bounds);
    },
 
    // intialize the map
    initialize: function() {
        console.log("[+] Intializing Google Maps...");
        var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(38.914873, -77.060494),
            mapTypeId: google.maps.MapTypeId.NORMAL
        };
 
        this.map = new google.maps.Map(
            document.getElementById('map-canvas'),
            mapOptions
        );

        // // adds transit overlay
        var transitLayer = new google.maps.TransitLayer();
        transitLayer.setMap(this.map);
 
    }
};
