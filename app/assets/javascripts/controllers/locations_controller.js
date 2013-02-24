PlaceIt.LocationsController = Backbone.View.extend({

  events: {
    'click .submit': 'geocodeLocation'
  },

  initialize: function() {
    _.bindAll(this, 'geocodeLocation', 'addLocation', 'geocodingError');

    this.geocoder = new google.maps.Geocoder();
    this.populateViews();
  },

  populateViews: function() {
    this.map = new PlaceIt.Views.GoogleMap( {el: $('#map'), collection: this.collection} );
    this.list = new PlaceIt.Views.LocationsList( {el: $('ul.locations'), collection: this.collection} );
  },

  /* Makes Google Maps api call to geocode by address and passes result to addLocation */
  geocodeLocation: function(evt) {
    var locationData = this.gatherLocationData();

    evt.preventDefault();
    this.geocoder.geocode( _.pick(locationData, 'address'), this.addLocation );
  },

  addLocation: function(geoResult, status) {
    var locationData = this.gatherLocationData();

    if (status !== 'OK') {
      this.geocodingError();
    }
    else {
      /* Map geocode data to our location model */
      var gloc = geoResult[0].geometry.location;
      var latlng = {latitude: gloc.lat(), longitude: gloc.lng()};
      this.collection.create(_.extend(locationData, latlng), {wait: true, error: this.geocodingError});
    }
  },

  /* TODO */
  geocodingError: function() {
    this.map.displayError();
  },

  gatherLocationData: function() {
    return {
      name: this.$el.find('[name="location[name]"]').val(),
      address: this.$el.find('[name="location[address]"]').val()
    };
  }

});


/* Instantiate controller */
$(document).ready(function() {
  if ($('body.locations.index').length == 0) {
    return;
  }

  PlaceIt.ctrl = new PlaceIt.LocationsController( {el: $('form'), collection: PlaceIt.locations} );
});
