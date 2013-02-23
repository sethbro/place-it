PlaceIt.Views.LocationItem = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  render: function() {
    var $el = $(_.template( PlaceIt.Templates.location_item, this.model.toJSON() ));
    /* Update element, including bound events, etc. */
    this.setElement($el);
  }

});
