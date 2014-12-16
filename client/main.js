Meteor.subscribe('stations');

Meteor.subscribe('trains');

if (Meteor.isClient){

	Template.body.helpers({
		stations: function(){
			return Stations.find({});
		}
	});

	Template.body.events({
		"click #update-stations": function () {
			lnArray = ["RD"];
			for (var i = 0; i < lnArray.length; i++) {
				$.ajax({
					url: 'http://api.wmata.com/Rail.svc/json/jStations?api_key=ymwhvewux83gz974ythn5u4e',
					dataType: 'jsonp',
					success: function(data){
						Meteor.call("updateStations", data.Stations);
					}
				});
			}
		},

		"click #clear-stations": function(){
			Meteor.call("clearStations");
		}
	});
}

