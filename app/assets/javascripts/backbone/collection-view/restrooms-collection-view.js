var RestroomCollectionView = Backbone.View.extend({
  tagName: 'ul',
  className: 'restrooms-list',
  render: function() {
    this.$el.empty();
    var currentRestroomCollectionView = this;
    this.collection.models.forEach(function(model){
      var newView = new RestroomView({ model: model });
      currentRestroomCollectionView.$el.append(newView.$el);
      // currentRestroomCollectionView.$el.append('<li>' + model.get('id') + model.get('name') + '</li>');
    });
    $('#content').append(this.$el);
  },
  initialize: function() {
    this.render();
    this.collection.on('add', this.render.bind(this));
  }
});
