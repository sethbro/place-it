PlaceIt.LocationsController = function() {

  this.locations = [];

  this.initialize = function() {
    _.extend(this, Backbone.Events);
    _.bindAll(this, 'populateViews', 'addLocationViews', 'geocodeLocation');

    this.geocoder = new google.maps.Geocoder();
    this.initViews();
    this.initForm();
    this.initLocations();
  };

  this.initViews = function() {
    this.views = {};
    this.views.list = new PlaceIt.Views.LocationsList({el: $('ul.locations')});
    this.views.map = new PlaceIt.Views.GoogleMap( {el: $('#map')} );
  };

  this.initForm = function() {
    this.form = new PlaceIt.Views.NewLocationForm( {el: $('form')} );
    this.listenTo(this.form, 'location:add', this.geocodeLocation );
  },

  /* Set collection, listen for changes, & retrieve initial locations from server */
  this.initLocations = function() {
    this.locations = new PlaceIt.Locations();
    this.listenTo(this.locations, 'add', this.addLocation);

    this.locations.fetch({success: this.populateViews});
  };

  /* Create list and marker views */
  this.populateViews = function(locations, response, opts) {
    locations.models.forEach( function(loc, response, opts) {
      this.addLocationViews(loc);
    }, this);
  };

  /* Makes Google Maps api call to geocode by address and passes result to initNewLocation if valid */
  this.geocodeLocation = function(locationData) {
    this.geocoder.geocode( _.pick(locationData, 'address'), _.bind(function(geoResult, status) {
      var gloc, latlng;

      if (status !== 'OK') {
        this.geocodingError(locationData);
      }
      else {
        gloc = geoResult[0].geometry.location;
        latlng = {latitude: gloc.lat(), longitude: gloc.lng()};

        this.locations.create(_.extend(locationData, latlng), {wait: true});
      }
    }, this));
  };

  /* TODO */
  this.geocodingError = jQuery.noop;

  this.addLocationViews = function(model) {
    this.views.list.addItem(model);
    this.views.map.addMarker(model);
  };

  /* Kickoff */
  this.initialize();
}


/* Instantiate controller */
$(document).ready(function() {
  if ($('body.locations.index').length == 0) {
    return;
  }

  PlaceIt.ctrl = new PlaceIt.LocationsController();
});
