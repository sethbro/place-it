/* Responsible for creating & maintaining a single Google Map.
  * Maintains an internal array of LocationMarker views
  * & updates these based on Location changes.
  *
  * Dependencies: Google Maps
  */

PlaceIt.Views.GoogleMap = Backbone.View.extend({

  gmap_defaults: {
    MapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng( 41.9, -87.63 ),
    mapTypeControlOptions: {mapTypeIds: []},
    panControl: false,
    streetViewControl: false,
    zoom: 13
  },

  initialize: function() {
    this.markers = [];
    this.initGMap();

    _.bindAll(this, 'geocodeLocation', 'updateMarker');

    /* Keep a lookout for new locations, deletions, & changed addresses */
    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'destroy', this.removeMarker);
    this.listenTo(this.collection, 'change:address', this.geocodeLocation);

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
    /* Re-center & set reasonable zoom if we're down to 1 marker */
    if (this.markers.length == 1) {
      this.gmap.setZoom( this.gmap_defaults.zoom );
      this.gmap.panTo( this.markerLatLng(this.markers[0]) );
    }
    /* Otherwise determine bounds of all markers & reposition around that */
    else if (this.markers.length > 1) {
      var bounds = new google.maps.LatLngBounds();
      this.markers.forEach( function(marker, i) {
        bounds.extend( this.markerLatLng(marker) );
      }, this);

      this.gmap.fitBounds(bounds);
    };
  },

  /* Creates a new marker */
  addMarker: function(location) {
    /* LocationMarker ID is expected to match Location ID */
    var marker_data = {
      id: location.id,
      map: this.gmap,
      model: location,
      name: location.get('name')
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

  /* Calls fresh geocode for updated location */
  geocodeLocation: function(location) {
    PlaceIt.geocoder.geocode( {address: location.get('address')}, _.bind( function(geoResult, status) {
      if (status == 'OK') {
        this.updateMarker(location, geoResult);
      }
      else {
        this.displayError();
      }
    }, this));
  },

  /* Removes current marker from internal array & makes call to update */
  updateMarker: function(location, geoResult) {
    this.markers = _.reject(this.markers, function(m) { return m.id == location.id; });

    location.set( PlaceIt.geocoder.resultToLatLng(geoResult) );
    location.save();
    this.addMarker(location);
  },

  /* FIXME: Error message is outside this view element */
  displayError: function() {
    var $msg = $('.error_message');
    $msg.addClass('active');
    setTimeout( function() { $msg.removeClass('active'); }, 1800 );
  },

  markerLatLng: function(marker) {
    return new google.maps.LatLng(marker.gmarker.position.lat(), marker.gmarker.position.lng());
  }

});
