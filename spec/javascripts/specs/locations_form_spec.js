//= require googlemaps.3.11
//= require spec_helper

describe( 'LocationsForm', function() {

  beforeEach(function() {
    $('body').html( JST['templates/locations']() );
    var locs = new PlaceIt.Locations( [{name: 'foo', address: 'bar', latitude: 1.5, longitude: 1.5}] );
    window.form = new PlaceIt.LocationsForm( {el: $('form'), collection: locs} );
  });


  it( 'fires geocode request with location address on form click', function() {
    log(PlaceIt, PlaceIt.geocoder);
    spy = sinon.spy(PlaceIt.geocoder, 'geocode');

    $('input[name="location[address]"]').val('foo');
    form.$el.find('.submit').click();

    assert(spy.calledWith( {address: 'foo'} ));
  });

  it( 'fires model create call upon successful geocode', function() {
    var geo = {geometry: { location: {} }};
    var lat = geo.geometry.location.lat = function() { return 1.5; };
    var lng = geo.geometry.location.lng = function() { return 1.5; };

    create_stub = sinon.stub(form.collection, 'create');
    // expected_data = {name: '', address: 'foo', latitude: lat(), longitude: lng()};

    $('input[name="location[address]"]').val('foo');
    form.$el.find('.submit').click();

    create_stub.called.should.be(true);
  });

});
