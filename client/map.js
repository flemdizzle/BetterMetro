
Template.map.rendered = function() {
    gmaps.initialize();
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
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