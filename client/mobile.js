
mobile = {
  closeStations: [],
  userLocation: null,
  walkingDistanceStations: function(stationArray){
    var walkingStations = [];

    //Optimize this later
    for (var i = 0; i < stationArray.length; i++) {
      var stationLatLng = new google.maps.LatLng(stationArray[i].Lat, stationArray[i].Lon);
      
      //returns distance between two latlngs using google geometry library
      var result = google.maps.geometry.spherical.computeDistanceBetween(this.userLocation, stationLatLng);
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
    mobile.userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    mobile.walkingDistanceStations(Stations.find().fetch());
    
    Deps.autorun(function(){
      //have this set a session variable to the current trains
      var walkingStations = mobile.closeStations;

      var trains = [];

      for(var i = 0, leng = walkingStations.length; i < leng; i++){
        var TrainArray = Trains.find({LocationCode: walkingStations[i].Code}).fetch();

        trains = trains.concat(TrainArray);
      }

      Session.set("trains", trains);
    });
  });
});

Template.mobile.helpers({
  trains: function(){
    if(Session.equals("trains", undefined)){
      return [{"Car": "Loading Location...."}];
    }
    return Session.get("trains");
  }
});
