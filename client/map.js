
Template.map.rendered = function() {
    gmaps.initialize();
    navigator.geolocation.getCurrentPosition(function(position) {
        gmaps.userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        gmaps.centerMap();

        Meteor.subscribe('stations', function(){
            function buildStationObjects(stations){
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

                // re-center on new markers
                gmaps.markerBounds();
            }
            gmaps.walkingDistanceStations(Stations.find().fetch(), buildStationObjects);

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
        }); // end of subscribe
    }); // end of geolocation
     
};

