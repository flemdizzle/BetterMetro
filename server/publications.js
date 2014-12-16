
Meteor.publish('stations', function(){
	return Stations.find({});
});

Meteor.publish('trains', function(){
  return Trains.find({});
});
