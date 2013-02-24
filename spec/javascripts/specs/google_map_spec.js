//= require googlemaps.3.11
//= require spec_helper

describe( 'GoogleMap', function() {

  beforeEach(function() {
    $('body').html( JST['templates/locations']() );
    var location = new PlaceIt.Location( {name: 'foo', address: 'bar', latitude: 1.5, longitude: 1.5} );
    var locs = new PlaceIt.Locations([location]);
    window.map = new PlaceIt.Views.GoogleMap( {el: $('#map'), collection: locs} );
  });


  it( 'instantiates a Google Map', function() {
    window.map.gmap.should.be.instanceof( google.maps.Map );
  });

  it( 'adds markers for initial collection', function() {
    window.map.markers[0].should.be.instanceof(PlaceIt.Views.LocationMarker);
  });

});
