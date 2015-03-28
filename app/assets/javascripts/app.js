console.log('app.js has loaded');

$(function(){
  var restrooms = new RestroomCollection();
  restrooms.fetch ({
    success: function() {
      var restroomView = new RestroomCollectionView ({
        collection: restrooms
      });
    }
  });
});
