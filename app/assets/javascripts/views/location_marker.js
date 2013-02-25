/* Responsible for updating an individual marker in a Google Map.
  * Tied to a Location instance. Requires {map: google.maps.Map instance } in constructor options.
  *
  * Dependencies: Google Maps
  */

PlaceIt.Views.LocationMarker = Backbone.View.extend({

  initialize: function() {
    this.gmarkerOpts = {
      animation: google.maps.Animation.DROP,
      map: this.options.map,
      title: this.options.name
    };

    this.listenTo(this.model, 'destroy', this.removeMarker);
    this.listenTo(this.model, 'change:latitude', this.updateMarker);
    this.render();
  },

  render: function() {
    var latlng = new google.maps.LatLng( this.model.get('latitude'), this.model.get('longitude') );
    var full_opts = _.extend( this.gmarkerOpts, {position: latlng} );

    this.gmarker = new google.maps.Marker(full_opts);
  },

  updateMarker: function(model, opts) {
    this.removeMarker();
    this.render();
  },

  removeMarker: function(model, collection, opts) {
    this.gmarker.setMap(null);
  }

});
