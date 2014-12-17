
Meteor.publish('stations', function(){
	return Stations.find({LineCode1: "OR"});
});

Meteor.publish('trains', function(){
  return Trains.find({});
});
