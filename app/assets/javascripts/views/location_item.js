PlaceIt.Views.LocationItem = Backbone.View.extend({

  events: {
    'click .delete': 'removeLocation'
  },

  initialize: function() {
    this.listenTo(this.model, 'destroy', this.remove);
    this.render();
  },

  /* Update element, including bound events, etc. */
  render: function() {
    var $el = $(_.template( PlaceIt.Templates.location_item, this.model.toJSON() ));
    this.setElement($el);
  },

  removeLocation: function(evt) {
    this.model.destroy({wait: true});
  }

});
