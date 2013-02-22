PlaceIt.Views.LocationItem = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  render: function() {
    var $el = $(_.template( PlaceIt.Templates.location_item, this.model.toJSON() ));
    this.setElement($el);
  }

});
