var Restroom = Backbone.Model.extend({

  defaults: {
    name: 'Home',
    address: '318 E. 11th St., New York, NY 10003',
    category: 'apartment',
    coordinates: 'unknown',
    rating: 4,
    google_id: 'unknown',
    open_now: false
  }
});
