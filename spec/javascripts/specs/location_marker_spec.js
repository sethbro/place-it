//= require googlemaps.3.11
//= require spec_helper

describe( 'LocationMarker', function() {

  beforeEach(function() {
    $('body').html( JST['templates/locations']() );
    window.loc = new PlaceIt.Location( {name: 'foo', address: 'bar', latitude: 1.5, longitude: 1.5} );
    var map = new google.maps.Map($('#map')[0]);
    window.marker = new PlaceIt.Views.LocationMarker( {model: window.loc, map: map} );
  });


  it( 'adds google marker on initialize', function() {
    var gmarker = window.marker.gmarker;
    gmarker.should.be.instanceof( google.maps.Marker );
  });

  it( 'google marker uses model latlng', function() {
    var gmarker = window.marker.gmarker;
    gmarker.position.lat().should.equal( window.loc.get('latitude') )
    gmarker.position.lng().should.equal( window.loc.get('longitude') )
  });

  it( 'removes google marker on model destroy', function() {
    var spy = sinon.spy(window.marker.gmarker, 'setMap');
    window.loc.trigger('destroy');

    assert(spy.called);
  });

});
