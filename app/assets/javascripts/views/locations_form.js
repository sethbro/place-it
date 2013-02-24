PlaceIt.LocationsForm = Backbone.View.extend({

  events: {
    'click .submit': 'geocodeLocation'
  },

  initialize: function() {
    _.bindAll(this, 'geocodeLocation', 'addLocation', 'geocodingError');
  },

  /* Makes Google Maps api call to geocode by address and passes result to addLocation */
  geocodeLocation: function(evt) {
    evt.preventDefault();

    var locationData = this.gatherLocationData();
    PlaceIt.geocoder.geocode( _.pick(locationData, 'address'), this.addLocation );
  },

  addLocation: function(geoResult, status) {
    var locationData = this.gatherLocationData();

    if (status !== 'OK') {
      this.geocodingError();
    }
    else {
      /* Map geocode data to our location model */
      var latlng = PlaceIt.geocoder.resultToLatLng(geoResult);
      this.collection.create(_.extend(locationData, latlng), {wait: true, error: this.geocodingError});
    }
  },

  geocodingError: function() {
    PlaceIt.map.displayError();
  },

  gatherLocationData: function() {
    return {
      name: this.$el.find('[name="location[name]"]').val(),
      address: this.$el.find('[name="location[address]"]').val()
    };
  }

});
