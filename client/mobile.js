Session.set("loading", true);

Template.mobile.helpers({
  stations: function(){
    if(Session.equals("stations", undefined)){
      Session.set("loading")
      return;
    }
    Session.set("loading", false);
    return Session.get("stations");
  },
  loading: function(){
    return Session.get("loading");
  }
});

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

      var stations = [];

      for(var i = 0, leng = walkingStations.length; i < leng; i++){
        var TrainArray = Trains.find({LocationCode: walkingStations[i].Code}).fetch();
        var station = {};
        station.Name = walkingStations[i].Name
        station.Trains = TrainArray
        stations.push(station);
      }

      Session.set("stations", stations);
    });
  });
});

