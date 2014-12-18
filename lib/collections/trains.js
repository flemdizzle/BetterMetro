Trains = new Mongo.Collection("trains");


Meteor.methods({
  addTrains: function(jsonObj){
    Trains.remove({});
    for (var i = 0; i < jsonObj.length; i++) {
      Trains.insert(jsonObj[i]);
    }
  }
});