/* Individual list item in LocationsList.
  * Contains name, address, edit & delete controls.
*/

PlaceIt.Views.LocationItem = Backbone.View.extend({

  events: {
    'click .edit': 'editLocation',
    'click .save': 'updateLocation',
    'click .delete': 'removeLocation'
  },

  initialize: function() {
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'sync', this.closeEditable);
    this.render();
  },

  /* Update element, including bound events, etc. */
  render: function() {
    var $el = $(_.template( PlaceIt.Templates.location_item, this.model.toJSON() ));
    this.setElement($el);
  },

  editLocation: function(evt) {
    this.toggleAddressElements();
  },

  /* Changes model attribute locally. Parent views listen for change & save as needed. */
  updateLocation: function(evt) {
    evt.preventDefault();

    var newValue = this.$el.find('.editable_address').val();
    if (newValue == this.model.get('address')) { return; }

    this.model.set({address: newValue});
    this.$el.find('.address').text(newValue);
  },

  removeLocation: function(evt) {
    this.model.destroy({wait: true});
  },

  closeEditable: function(location) {
    if (this.$el.find('.editable_address:visible').length > 0) {
      this.toggleAddressElements();
    }
  },

  toggleAddressElements: function() {
    this.$el.find('.address, .editable_address, .edit, .save').toggleClass('hidden');
  }

});
