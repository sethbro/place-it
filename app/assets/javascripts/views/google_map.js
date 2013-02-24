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
    this.listenTo(this.collection, 'destroy', this.removeMarker);

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

  /* Zoom to accommodate new markers */
  render: function() {
    if (this.markers.length == 1) {
      this.gmap.setZoom( this.gmap_defaults.zoom );
      this.gmap.panTo( this.markerLatLng(this.markers[0]) );
    }
    else if (this.markers.length > 1) {
      var bounds = new google.maps.LatLngBounds();
      this.markers.forEach( function(marker, i) {
        bounds.extend( this.markerLatLng(marker) );
      }, this);

      this.gmap.fitBounds(bounds);
    };
  },

  addMarker: function(locationModel) {
    var marker_data = {
      map: this.gmap,
      id: locationModel.id,
      model: locationModel,
      name: locationModel.get('name')
    };

    var view = new PlaceIt.Views.LocationMarker( marker_data );
    this.markers.push(view);
    this.render();
  },

  /* Remove marker view from internal array & re-render */
  removeMarker: function(location) {
    this.markers = _.reject(this.markers, function(m) { return m.id == location.id; });
    this.render();
  },

  markerLatLng: function(marker) {
    return new google.maps.LatLng(marker.gmarker.position.lat(), marker.gmarker.position.lng());
  }

});
