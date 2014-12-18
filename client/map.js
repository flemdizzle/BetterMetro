
Template.map.rendered = function() {
    gmaps.initialize();
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var latLng = new google.maps.LatLng(lat, lng);
        var tstLatLng = new google.maps.LatLng(38.904518, -77.054880);
        console.log(lat, lng);
        gmaps.map.setCenter(latLng);
        gmaps.map.setZoom(16);
        new google.maps.Marker({
            position: latLng,
            map: gmaps.map,
            icon:'https://storage.googleapis.com/support-kms-prod/SNP_2752129_en_v0'
        });
        var result = google.maps.geometry.spherical.computeDistanceBetween(latLng, tstLatLng);
        console.log(result);

    });
     
};


Meteor.subscribe('stations', function(){
    var stations = Stations.find().fetch();
    _.each(stations, function(station) {
        if (typeof station !== 'undefined' &&
            typeof station.Lat !== 'undefined' &&
            typeof station.Lon !== 'undefined') {

            var objMarker = {
                id: station._id,
                lat: station.Lat,
                lng: station.Lon,
                title: station.Name,
                code: station.Code
            };

            gmaps.addMarker(objMarker);
        }
    });

    Deps.autorun(function() {
        for (var a = 0; a < gmaps.infoWindows.length; a++) {
            gmaps.infoWindows[a].close();
        }
        var data = Trains.find({});
        console.log("[+] Loading Info Windows...");
        for (var i = 0; i < gmaps.markerData.length; i++) {
            var trainArray = Trains.find({LocationCode: gmaps.markerData[i].code}).fetch();

            var trainsAtStation = "";

            for (var x = 0; x < trainArray.length; x++) {
                trainsAtStation += '<li>' + trainArray[x].Line + ' ' + trainArray[x].DestinationName + ' ' + trainArray[x].Min + '</li>';
            }

            var trainStatus = {
                markerIndex: i,
                message: trainsAtStation
            };
            
            gmaps.addInfoWindow(trainStatus);
            

        }

    });
});