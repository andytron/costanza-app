var RestroomView = Backbone.View.extend({
  tagName: 'li',
  className: 'restroom-view',
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.text('<h2>' + this.model.get('name') + '</h2>');
  },
  events: {

  },
  destroy: function() {
    this.$el.remove();
    this.model.destroy();
  }
});
