//= require googlemaps.3.11
//= require spec_helper

describe( 'LocationsController', function() {

  beforeEach(function() {
    $('body').html( JST['templates/locations']() );
    var locs = new PlaceIt.Locations( [{name: 'foo', address: 'bar', latitude: 1.5, longitude: 1.5}] );
    window.ctrl = new PlaceIt.LocationsController( {el: $('form'), collection: locs} );
  });

  /* FORM */
  describe( 'form', function() {

    it( 'instantiates geocoder', function() {
      window.ctrl.geocoder.should.be.instanceof(google.maps.Geocoder);
    });

    it( 'fires geocode request with location address on form click', function() {
      spy = sinon.spy(window.ctrl.geocoder, 'geocode');

      $('input[name="location[address]"]').val('foo');
      window.ctrl.$el.find('.submit').click();

      assert(spy.calledWith( {address: 'foo'} ));
    });

    it( 'fires model create call upon successful geocode', function() {
      var geo = {geometry: { location: {} }};
      var lat = geo.geometry.location.lat = function() { return 1.5; };
      var lng = geo.geometry.location.lng = function() { return 1.5; };

      create_stub = sinon.stub(window.ctrl.collection, 'create');
      // expected_data = {name: '', address: 'foo', latitude: lat(), longitude: lng()};

      $('input[name="location[address]"]').val('foo');
      window.ctrl.$el.find('.submit').click();

      create_stub.called.should.be(true);
    });

  });

  /* VIEWS */
  describe( 'other views', function() {
    it( 'instantiates list view with locations collection', function() {
      window.ctrl.list.should.be.instanceof( PlaceIt.Views.LocationsList );
      window.ctrl.list.collection.should.equal( window.ctrl.collection );
    });

    it( 'instantiates map view with locations collection', function() {
      window.ctrl.map.should.be.instanceof( PlaceIt.Views.GoogleMap );
      window.ctrl.map.collection.should.equal( window.ctrl.collection );
    });
  });

});
