Stations = new Mongo.Collection("stations");

Meteor.methods({
	updateStations: function(){
		console.log(stations.length);
		for (var i = 0; i < stations.length; i++) {
			Stations.insert(stations[i]);
		}
	},
	loadStations: function(){
		$.ajax({
      url: 'http://api.wmata.com/Rail.svc/json/jStations?api_key=ymwhvewux83gz974ythn5u4e',
      dataType: 'jsonp',
      success: function(data){
        Meteor.call("updateStations", data.Stations);
      }
    });
	}
});