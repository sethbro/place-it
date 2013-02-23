PlaceIt.Views.GoogleMap = Backbone.View.extend({

  gmap_defaults: {
    MapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng( 41.9, -87.63 ),
    zoom: 13
  },

  initialize: function() {
    var opts = {};
    this.markers = [];

    /* Override map center if provided with options */
    if (this.options.latitude && this.options.longitude) {
      opts.center = new google.maps.LatLng( this.options.latitude, this.options.longitude );
    }
    var full_opts = _.extend(this.gmap_defaults, opts);

    this.gmap = new google.maps.Map( this.el, full_opts );
    this.render();
  },

  render: function() {
  },

  addMarker: function(locationModel) {
    var view = new PlaceIt.Views.LocationMarker( {model: locationModel, map: this.gmap} );
    this.markers.push(view);
  }

});
