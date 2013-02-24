PlaceIt.Views.LocationsList = Backbone.View.extend({

  initialize: function() {
    this.populate();
    this.listenTo(this.collection, 'add', this.addItem);
    this.listenTo(this.collection, 'destroy', this.render);

    this.render();
  },

  populate: function() {
    this.collection.models.forEach( function(loc, i) {
      this.addItem(loc, i);
    }, this);
  },

  render: function() {
    if (this.$el.children('li').length == 0) {
      this.$el.addClass('empty');
    }
    else {
      this.$el.removeClass('empty');
    }
  },

  addItem: function(model, i) {
    var view = new PlaceIt.Views.LocationItem( {model: model} );
    this.$el.append( view.$el );
    this.render();
  }

});
