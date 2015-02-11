
// navigator.geolocation.getCurrentPosition(function(position){
//   Template.mobile.helpers({
//     locations: function(){
//       debugger;
//       return position.coords.latitude;
//     }
//   });
//   debugger;
// });

Session.set("userLocation", "Loading Location....");

navigator.geolocation.watchPosition(function(position) {
  Session.set("userLocation", position.coords.latitude.toString());
});
Template.mobile.helpers({
  locations: function(){
    return Session.get("userLocation");
  }
});
