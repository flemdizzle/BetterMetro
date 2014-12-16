Template.body.helpers({
	stations: function(){
		return Stations.find({});
	},
	trains: function(){
		return Trains.find({});
	}
});

Template.body.events({
	"click #update-stations": function () {
		$.ajax({
			url: 'http://api.wmata.com/Rail.svc/json/jStations?api_key=ymwhvewux83gz974ythn5u4e',
			dataType: 'jsonp',
			success: function(data){
				Meteor.call("updateStations", data.Stations);
			}
		});
	},

	"click #clear-stations": function(){
		Meteor.call("clearStations");
	}
});