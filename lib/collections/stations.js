Stations = new Mongo.Collection("stations");

Meteor.methods({
	updateStations: function(){
		$.ajax({
			url: 'http://api.wmata.com/Rail.svc/json/jStations?LineCode=RD&api_key=ymwhvewux83gz974ythn5u4e',
			dataType: 'jsonp',
			success: function(data){
				for (var i = 0; i < data.Stations.length; i++) {
					Stations.insert({
						name: "Steven"
					});
				};
			}
		})
	
	}
});