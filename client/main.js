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

