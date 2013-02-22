//= require googlemaps.3.11
//= require spec_helper

describe( 'LocationsController', function() {

  beforeEach(function() {
    $('body').html(JST['templates/locations']());
    window.ctrl = new PlaceIt.LocationsController();
  });

  /* FORM */
  describe( 'form', function() {

    it( 'instantiates form as a view', function() {
      window.ctrl.form.should.be.instanceof(PlaceIt.Views.NewLocationForm);
    });

    it( 'instantiates geocoder', function() {
      window.ctrl.geocoder.should.be.instanceof(google.maps.Geocoder);
    });

    it( 'fires geocode request with location address on form click', function() {
      spy = sinon.spy(window.ctrl.geocoder, 'geocode');

      $('input[name="location[address]"]').val('foo');
      window.ctrl.form.$el.find('.submit').click();

      assert(spy.calledWith( {address: 'foo'} ));
    });

    it.skip('fires model create call upon successful geocode', function() {
      var geo = {geometry: {location: {}}};
      var lat = geo.geometry.location.lat = function() { return 1.5; };
      var lng = geo.geometry.location.lng = function() { return 1.5; };

      create_stub = sinon.stub(window.ctrl.locations, 'create');
      expected = {name: '', address: 'foo', latitude: lat(), longitude: lng()};

      $('input[name="location[address]"]').val('foo');
      window.ctrl.form.$el.find('.submit').click();

      // Geocode result data is passed to an anonymous function. Not sure how to stub here.
    });

  });

  /* LIST */
  describe( 'locations list', function() {

    it( 'maintains a reference to map and locations list views', function() {
    });

  });

  /* MAP */
  describe( 'map', function() {

    it( 'instantiates map as a view', function() {
    });

  });

  describe( 'initialization', function() {
    it( 'fetches the locations collection', function() {
    });

  });

});
