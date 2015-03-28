var RestroomCollection = Backbone.Collection.extend({
  model: Restroom,
  url: '/restrooms'
});

RestroomCollection.prototype.getByPage = function() {
  // $.ajax()
}
