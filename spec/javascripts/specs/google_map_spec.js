//= require googlemaps.3.11
//= require spec_helper

describe( 'GoogleMap', function() {

  beforeEach(function() {
    $('body').html(JST['templates/locations']());
    window.map = new PlaceIt.Views.GoogleMap( {el: $('#map')} );
  });


  it( 'instantiates a Google Map' ), function() {
    window.map.gmap.should.be.instanceof( google.maps.Map );
  });

  it.skip( 'adds a marker based on location latlng', function() {
    var loc = new PlaceIt.Location({latitude: 2, longitude: 2, address: 'foo'});
    window.map.addMarker( {model: loc, map: window.map.gmap} );

    window.map.markers[0].should.be.instanceof(PlaceIt.Views.LocationMarker);
  });

});
