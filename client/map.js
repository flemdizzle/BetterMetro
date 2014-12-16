Template.map.rendered = function() {
    if (! Session.get('map'))
        gmaps.initialize();
 
    Deps.autorun(function() {
        var stations = Stations.find().fetch();
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
 
                // check if marker already exists
                if (!gmaps.markerExists('id', objMarker.id))
                    gmaps.addMarker(objMarker);
 
            }
        });
    });
};
 
Template.map.destroyed = function() {
    Session.set('map', false);
};