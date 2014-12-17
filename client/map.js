Template.map.rendered = function() {
    gmaps.initialize();
    var stations = Stations.find().fetch();
    console.log(stations);
    _.each(stations, function(station) {
        if (typeof station !== 'undefined' &&
            typeof station.Lat !== 'undefined' &&
            typeof station.Lon !== 'undefined') {

            var objMarker = {
                id: station._id,
                lat: station.Lat,
                lng: station.Lon,
                title: station.Name
            };

            gmaps.addMarker(objMarker);
        }
    });
 
    Deps.autorun(function() {
        for (var i = 0; i < gmaps.markerData.length; i++) {

            var trainArray = Trains.find({LocationCode: gmaps.markerData[i].Code}).fetch();

            var trainsAtStation = "";

            for (var x = 0; x < trainArray.length; x++) {
                trainsAtStations += trainArray[x].Line + " " + trainArray[x].DestinationName + " " + trainArray[x].Min + "\n";
            }

            var trainStatus = {
                markerIndex: i,
                message: trainsAtStation
            };

            gmaps.addInfoWindow(trainStatus);

        }

    });
};
 