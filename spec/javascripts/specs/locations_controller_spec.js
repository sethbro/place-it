//= require spec_helper

describe( 'LocationsController', function() {

  beforeEach(function() {
    $('body').html(JST['templates/locations']());
  });

  it( 'maintains a reference to map and locations list views', function() {
    var ctrl = new PlaceIt.LocationsController();

    ctrl.$mapView.should.be( $('#map') );
  })

} )