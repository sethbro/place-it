PlaceIt.Views.LocationsList = Backbone.View.extend({

  initialize: function() {
    this.populate();
    this.listenTo(this.collection, 'add', this.addItem);
  },

  populate: function() {
    this.collection.models.forEach( function(loc, i) {
      this.addItem(loc, i);
    }, this);
  },

  addItem: function(model, i) {
    var view = new PlaceIt.Views.LocationItem( {model: model} );
    this.$el.append( view.$el );
  }

});
