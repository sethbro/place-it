//= require spec_helper

describe( 'NewLocationForm', function() {

  beforeEach(function() {
    $('body').html(JST['templates/form']());
  });


  it ( 'fires a location:add event on click and includes form data', function() {
    form = new PlaceIt.Views.NewLocationForm({el: $('form')});
    var spy = sinon.spy(form, 'trigger');
    var values = {name: 'foo', address: 'bar'};

    $('input[name="location[name]"]').val(values.name);
    $('input[name="location[address]"]').val(values.address);
    $('.submit').click();

    assert(spy.calledWith('location:add', values));
  });

});
