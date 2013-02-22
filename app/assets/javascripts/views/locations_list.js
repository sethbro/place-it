PlaceIt.Views.LocationsList = Backbone.View.extend({

  initialize: function() {
    this.items = [];
    this.render();
  },

  render: function() {
  },

  addItem: function(model) {
    var view = new PlaceIt.Views.LocationItem( {model: model} );
    this.items.push(view);
    this.$el.append( view.$el );
  }

});
