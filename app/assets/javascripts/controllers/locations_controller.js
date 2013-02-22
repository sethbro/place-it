PlaceIt.LocationsController = function() {

  this.locations = [];
  this.listView = $()

  this.initialize = function() {
    _.bindAll(this, 'populateViews')
    this.gatherNodes();
    this.initLocations();
  };

  this.gatherNodes = function() {
    this.$listView = $('ul.locations');
    this.$mapView = $('#map');
  };

  /* Retrieve locations from server */
  this.initLocations = function() {
    this.locations = new PlaceIt.Locations();
    this.locations.fetch({success: this.populateViews});
  };

  /* Create list and marker views */
  this.populateViews = function(locations, response, opts) {
    this.locations.forEach( function(loc, i) {
      $li = $(_.template( PlaceIt.Templates.location_item, loc.toJSON() ))
      this.$listView.append($li);
    }, this)
  }

  /* Kickoff */
  this.initialize();

  return this;
}

/* Instantiate controller */
$(document).ready(function() {
  if ($('body.locations.index').length == 0) {
    return;
  }

  PlaceIt.ctrl = new PlaceIt.LocationsController();
});