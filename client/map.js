Template.map.rendered = function() {
    if (! Session.get('map'))
        gmaps.initialize();
 
    Deps.autorun(function() {
        var pages = FacebookPages.find().fetch();
 
        _.each(pages, function(page) {
            if (typeof page.location !== 'undefined' &&
                typeof page.location.latitude !== 'undefined' &&
                typeof page.location.longitude !== 'undefined') {
 
                var objMarker = {
                    id: page._id,
                    lat: page.location.latitude,
                    lng: page.location.longitude,
                    title: page.name
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