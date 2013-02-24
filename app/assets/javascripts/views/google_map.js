/* Dependencies: Google Maps */

PlaceIt.Views.GoogleMap = Backbone.View.extend({

  gmap_defaults: {
    MapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng( 41.9, -87.63 ),
    zoom: 13
  },

  initialize: function() {
    this.markers = [];
    this.initGMap();
    this.listenTo(this.collection, 'add', this.addMarker);
    this.populate();
  },

  initGMap: function() {
    var full_opts, opts = {};

    /* Override map center if provided at instantiation */
    if (this.options.latitude && this.options.longitude) {
      opts.center = new google.maps.LatLng( this.options.latitude, this.options.longitude );
    }
    full_opts = _.extend(this.gmap_defaults, opts);

    this.gmap = new google.maps.Map( this.el, full_opts );
  },

  populate: function() {
    this.collection.models.forEach( function(loc, i) {
      this.addMarker(loc, i);
    }, this);
  },

  addMarker: function(locationModel) {
    var view = new PlaceIt.Views.LocationMarker( {model: locationModel, map: this.gmap, name: locationModel.get('name')} );
    this.markers.push(view);
  }

});
