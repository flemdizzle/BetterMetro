Meteor.setInterval(function(){
  HTTP.get('http://api.wmata.com/StationPrediction.svc/json/GetPrediction/All', {params: {api_key: apiKeys.WMATA}}, function(error, result){
    Trains.remove({});
    var trainJSON = JSON.parse(result.content).Trains;
    for (var i = 0; i < trainJSON.length; i++) {
      Trains.insert(trainJSON[i]);
    }
  });
}, 10000);
