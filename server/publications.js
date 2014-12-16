
Meteor.publish('stations', function(){
	return Stations.find({});
});

Meteor.publish('trains', function(){
  return Trains.find({});
});

Meteor.publish('oneTrain', function(){
  return Trains.find().limit(1);
});
