PlaceIt.LocationsController = function() {

  this.locations = [];

  this.initialize = function() {
    _.extend(this, Backbone.Events);
    _.bindAll(this, 'populateInitialViews', 'addNewLocationViews', 'geocodeLocation');

    this.geocoder = new google.maps.Geocoder();
    this.gatherNodes();
    this.initForm();
    this.initLocations();
  };

  this.gatherNodes = function() {
    this.$listView = $('ul.locations');
    this.$mapView = $('#map');
  };

  this.initForm = function() {
    this.form = new PlaceIt.Views.NewLocationForm( {el: $('form')} );
    this.listenTo(this.form, 'location:add', this.geocodeLocation );
  },

  /* Set collection, listen for changes, & retrieve initial locations from server */
  this.initLocations = function() {
    this.locations = new PlaceIt.Locations();
    this.listenTo(this.locations, 'add', this.addLocation);

    this.locations.fetch({success: this.populateInitialViews});
  };

  /* Create list and marker views */
  this.populateInitialViews = function(locations, response, opts) {
    this.locations.forEach(function(loc, i) {

      /* List item */
      $li = $(_.template( PlaceIt.Templates.location_item, loc.toJSON() ));
      this.$listView.append($li);

      /* Map marker */

    }, this)
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

  this.geocodingError = jQuery.noop;

  this.addNewLocationViews = function(model, resp, options) {
    log('adding location');
    log('model', model);
    log('resp', resp);
    log('options', options);
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
