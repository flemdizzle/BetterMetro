Meteor.setInterval(function(){
  $.ajax({
    url: 'http://api.wmata.com/StationPrediction.svc/json/GetPrediction/All?api_key=ymwhvewux83gz974ythn5u4e',
    dataType: 'jsonp',
    success: function(data){
      Meteor.call("addTrains", data.Trains);
    }
  });
}, 20000);
