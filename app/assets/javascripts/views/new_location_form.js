PlaceIt.Views.NewLocationForm = Backbone.View.extend({

  events: {
    'click .submit': 'broadcastClick'
  },

  /* Gather & pass form data & pass with event */
  broadcastClick: function(evt) {
    evt.preventDefault();

    locationData = {
      name: this.$el.find('[name="location[name]"]').val(),
      address: this.$el.find('[name="location[address]"]').val()
    };
    this.trigger( 'location:add', locationData );
  }

});
