/* Dependencies: Google Maps */

PlaceIt.Views.LocationMarker = Backbone.View.extend({

  initialize: function() {
    this.gmarkerOpts = {
      animation: google.maps.Animation.DROP,
      map: this.options.map
    };
    this.render();
  },

  render: function() {
    var latlng = new google.maps.LatLng( this.model.get('latitude'), this.model.get('longitude') );
    var full_opts = _.extend( this.gmarkerOpts, {position: latlng} );

    this.gmarker = new google.maps.Marker(full_opts);
  }

});
