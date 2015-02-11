
mobile = {
  closeStations: [],
  walkingDistanceStations: function(stationArray){
    var walkingStations = [];

    //Optimize this later
    for (var i = 0; i < stationArray.length; i++) {
      var stationLatLng = new google.maps.LatLng(stationArray[i].Lat, stationArray[i].Lon);
      
      //returns distance between two latlngs using google geometry library
      var result = google.maps.geometry.spherical.computeDistanceBetween(Session.get("userLocation"), stationLatLng);
      if(result < 800){
        walkingStations.push(stationArray[i]);
      }
    }

    if(walkingStations != this.closeStations){
      this.closeStations = walkingStations;
    }
  }
};

Meteor.subscribe('stations', function(){
  navigator.geolocation.watchPosition(function(position) {
    Session.set("userLocation", new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    mobile.walkingDistanceStations(Stations.find().fetch());
  });

  Deps.autorun(function(){
    //have this set a session variable to the current trains

    // trainInfo: function(walkingStations){
    // for(var i = 0, leng = walkingStations.length; i < leng; i++){
    //   var TrainArray = Trains.find
    // }

  });
});

Template.mobile.helpers({
  locations: function(){
    if(Session.equals("userLocation", undefined)){
      return "Loading Location....";
    }
    return mobile.walkingDistanceStations(Stations.find().fetch());
  }
});
