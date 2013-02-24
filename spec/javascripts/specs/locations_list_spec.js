//= require googlemaps.3.11
//= require spec_helper

describe( 'LocationsList', function() {

  beforeEach(function() {
    $('body').html( JST['templates/locations']() );

    window.loc = new PlaceIt.Location( {name: 'foo', address: 'bar', latitude: 1.5, longitude: 1.5} );
  });


  it( 'populates items on init', function() {
    var locs = new PlaceIt.Locations([loc]);
    var list = new PlaceIt.Views.LocationsList( {el: $('.locations'), collection: locs} );

    list.$el.children('li').length.should.equal(1);
  });

  it( 'toggles empty message on render', function() {
    var locs = new PlaceIt.Locations();
    var list = new PlaceIt.Views.LocationsList( {el: $('.locations'), collection: locs} );
    list.$el.should.have.class('empty');

    list.addItem(loc);
    list.$el.should.not.have.class('empty');
  })

});
