Stations = new Mongo.Collection("stations");

Meteor.methods({
	updateStations: function(stations){
		// console.log(stations.length);
		for (var i = 0; i < stations.length; i++) {
			Stations.insert(stations[i]);
		}
	}
});