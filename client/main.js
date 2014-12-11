Meteor.subscribe('stations');

if (Meteor.isClient){

	Template.body.helpers({
		stations: function(){
			return Stations.find({});
		}

	});

	Template.body.events({
		"click #update-stations": function () {
			Meteor.call("updateStations");
		}
	});
}

Meteor.methods({
	updateStations: function(){
		console.log('hey');
		var output = $.getJSON("http://api.wmata.com/Rail.svc/json/jStations?LineCode=OR&api_key=ymwhvewux83gz974ythn5u4e");
		
	}
});