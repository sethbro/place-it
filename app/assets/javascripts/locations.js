//= require place_it
//= require_tree ./templates
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views

  /* Geocoder with convenience methods for general use */
  PlaceIt.geocoder = new google.maps.Geocoder();
  PlaceIt.geocoder.resultToLatLng = function(geocoderResult) {
    var gloc = geocoderResult[0].geometry.location;
    return {latitude: gloc.lat(), longitude: gloc.lng()};
  };

/* Instantiate controller */
$(document).ready(function() {
  if ($('body.locations.index').length == 0) {
    return;
  };

  /* Instantiate views */
  var locs = PlaceIt.locations;
  PlaceIt.form = new PlaceIt.LocationsForm( {el: $('form'), collection: locs} );
  PlaceIt.map = new PlaceIt.Views.GoogleMap( {el: $('#map'), collection: locs} );
  PlaceIt.list = new PlaceIt.Views.LocationsList( {el: $('ul.locations'), collection: locs} );
});
