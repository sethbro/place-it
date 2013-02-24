//= require googlemaps.3.11
//= require spec_helper

describe( 'LocationItem', function() {

  beforeEach(function() {
    $('body').html( JST['templates/locations']() );
    window.loc = new PlaceIt.Location( {name: 'foo', address: 'bar', latitude: 1.5, longitude: 1.5} );
    window.item = new PlaceIt.Views.LocationItem( {model: loc} );
  });


  it( 'sets element from template', function() {
    item.$el.should.have('[name="location[address]"]');
  });

  it( 'opens editable fields on edit click', function() {
    $('body').append(item.$el);
    item.$el.find('.edit').click();

    item.$el.find('.editable_address').should.be.visible;
    item.$el.find('.address').should.not.be.visible;
    item.$el.find('.save').should.be.visible;
  });

  it( 'deletes location model on delete click', function() {
    var spy = sinon.spy(loc, 'destroy');
    item.$el.find('.delete').click();
    assert(spy.called);
  });

});