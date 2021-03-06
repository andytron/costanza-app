var map;
var service;
var marker;
var markers = [];
var infowindow;
var autocomplete;

var icons = {
  book_store: {
    icon: 'http://i.imgur.com/FOqEJgD.png'
  },
  cafe: {
    icon: 'http://i.imgur.com/tQz8qjt.png'
  },
  department_store: {
    icon: 'http://i.imgur.com/E0BjYSo.png'
  },
  establishment: {
    icon: 'http://i.imgur.com/lapri0B.png'
  },
  food: {
    icon: 'http://i.imgur.com/tQz8qjt.png'
  },
  library: {
    icon: 'http://i.imgur.com/nqOOwiJ.png'
  },
  lodging: {
    icon: 'http://i.imgur.com/ICGAjXe.png'
  },
  movie_theater: {
    icon: 'http://i.imgur.com/GGAOjqi.png'
  },
  park: {
    icon: 'http://i.imgur.com/wmNUZXw.png'
  },
  school: {
    icon: 'http://i.imgur.com/fJiTaEZ.png'
  },
  train_station: {
    icon: 'http://i.imgur.com/YyPRwex.png'
  },
  university: {
    icon: 'http://i.imgur.com/fJiTaEZ.png'
  }
};

// callback to create map markers for all restroom results
function handleSearchResults(results, status) {

  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for(var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

// creates a map marker per restroom result
function createMarker(place, i) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: placeLoc,
    animation: google.maps.Animation.DROP,
    icon: icons[place.types[0]].icon
  });

  // add restroom results to the DOM
  var $restrooms = $('#restrooms');
  var $restroomResult = $('<ul id="restroom-result" class="col-xs-6"></ul>');
  var $restroomLi = $(
    '<li><h4>' + place.name + '</h4></li>' +
    '<li>Address: ' + place.vicinity + '</li>' +
    '<li>Category: ' + place.types[0] + '</li>' +'<br>'
  );

  // generates infowindows on the map for restroom results
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(
      '<div id="infowindow-content">' +
      '<h4>' + place.name + '</h4>' +
      'Address: ' + place.vicinity + '<br>' +
      'Category: ' + place.types[0] +
      '</div>'
    );

    infowindow.open(map, this);
  });

  markers.push(marker);

  // event listener when user clicks on a map marker for restroom info
  google.maps.event.addDomListener($restroomResult[0], 'click', function() {
    google.maps.event.trigger(marker, 'click');
  });

  $restrooms.append($restroomResult);
  $restroomResult.append($restroomLi);
}

// clears all markers from the viewable map
// when a new search is made
function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].setMap(null);
    }
  }

  markers = [];
}

// clears all restroom results from the document
// when a new search is made
function clearResults() {
  var restrooms = document.getElementById('restrooms');
  while (restrooms.childNodes[0]) {
    restrooms.removeChild(restrooms.childNodes[0]);
  }
}

// if the map is repositioned and user clicks on 'Refresh Map' button,
// refreshes the map on a new search and returns new restroom results
function performSearch() {
  clearResults();
  clearMarkers();

  var keywordArray = ['starbucks', 'coffee+shop', 'park', 'hotel', 'department store', 'nyu school', 'bed bath beyond', 'barnes and noble', 'the new school', 'foundation+center', 'angelika', 'grand central terminal'];

  for (var i = 0; i < keywordArray.length; i++) {
    var arrayResults = {
      bounds: map.getBounds(),
      keyword: keywordArray[i]
    };

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(arrayResults, handleSearchResults);
  }
}

// initializes the map based on user's geolocation
// and returns restroom search results
function initialize(location) {
  console.log(location);

  var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);

  var mapOptions = {
    center: currentLocation,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  var input = document.getElementById('searchTextField');

  autocomplete = new google.maps.places.Autocomplete(input);
  places = new google.maps.places.PlacesService(map);
  google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);

  // performs a new search for restrooms
  // via the Google Places autocomplete search bar
  function onPlaceChanged() {
    clearResults();
    clearMarkers();

    var place = autocomplete.getPlace();
      if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(15);
        search();
      }
  }

  // performs a new restroom search
  // when the map location is changed via the search bar
  function search() {
    var keywordArray = ['starbucks', 'coffee+shop', 'park', 'hotel', 'department store', 'nyu school', 'bed bath beyond', 'barnes and noble', 'the new school', 'foundation+center', 'angelika', 'grand central terminal'];

    for (var i = 0; i < keywordArray.length; i++) {
      var arrayResults = {
        bounds: map.getBounds(),
        keyword: keywordArray[i]
      };

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(arrayResults, handleSearchResults);
    }
  }

  infowindow = new google.maps.InfoWindow();

  var marker = new google.maps.Marker({
    position: currentLocation,
    map: map,
    animation: google.maps.Animation.DROP
  });

  // this ensures we wait until the map bounds are initialized
  // before we perform the restrooms search
  google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);


  // redo restrooms search when the 'Refresh Map' button is clicked
  $('#refresh').click(performSearch);
}

$(document).ready(function() {
  $.ajax({
    url: '/logged_in',
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    datatype: 'json',
    success: function(data){
      if(data){
        navigator.geolocation.getCurrentPosition(initialize);
      }
    }
  });
});
