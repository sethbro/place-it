//= require googlemaps.3.11
//= require spec_helper

describe( 'GoogleMap', function() {

  beforeEach(function() {
    $('body').html( JST['templates/locations']() );

    window.loc = new PlaceIt.Location( {name: 'foo', address: 'bar', latitude: 1.5, longitude: 1.5} );
    window.loc2 = new PlaceIt.Location( {name: 'foo2', address: 'bar2', latitude: 2.5, longitude: 2.5} );
    window.locs = new PlaceIt.Locations([loc]);
    window.map = new PlaceIt.Views.GoogleMap( {el: $('#map'), collection: locs} );
  });

  it( 'instantiates a Google Map', function() {
    map.gmap.should.be.instanceof( google.maps.Map );
  });

  it( 'adds markers for initial collection', function() {
    map.markers[0].should.be.instanceof(PlaceIt.Views.LocationMarker);
  });

  it( 'adds marker on new location', function() {
    var marker_count = map.markers.length
    locs.add(loc2);

    map.markers.length.should.equal(marker_count + 1);
  });

  it( 'removes marker on location destroy', function() {
    var marker_count = map.markers.length;
    loc.destroy();

    map.markers.length.should.equal(marker_count - 1);
  });

  it( 'geocodes location on update', function() {
    var geocode_spy = sinon.spy(PlaceIt.geocoder, 'geocode');
    loc.set({address: 'statue of liberty'});

    assert(geocode_spy.called);
    PlaceIt.geocoder.geocode.restore();
  });

});
