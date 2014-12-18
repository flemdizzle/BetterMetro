
Meteor.publish('stations', function(){
	return Stations.find({});
});

Meteor.publish('trains', function(){
  return Trains.find({});
});

// Meteor.publish('API', function(){
//   var api = {
//     wmata: 'ymwhvewux83gz974ythn5u4e'
//   };
//   return api;
// });