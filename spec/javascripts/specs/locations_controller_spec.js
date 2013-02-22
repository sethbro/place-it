//= require spec_helper

describe( 'LocationsController', function() {

  beforeEach(function() {
    $('body').html(JST['templates/locations']());
    this.ctrl = new PlaceIt.LocationsController();
  });

  /* FORM */
  describe( 'form', function() {

    it( 'instantiates form as a view', function() {
    });

    it( 'creates new location with form data on click', function() {
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
