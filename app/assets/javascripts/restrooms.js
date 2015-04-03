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

var video = $("#playerid").attr("src");
$("#playerid").attr("src","");
$("#playerid").attr("src",video);

// callback
function handleSearchResults(results, status) {
  console.log(results);

  // var restroomData = [];
  // for (var i = 0; i < results.length; i++) {
  //   restroomData.push(results[i].name, results[i].vicinity, results[i].types[0] );
  // }

  var restroomData = $.map(results, function(result) {
    return[[ result.name, result.vicinity, result.types[0] ]];
  });

  // debugger;

  // if (results) {
    $.ajax({
      url: '/restrooms',
      method: 'post',
      data: {restroom: restroomData},
      datatype: 'json',
      success: function(){
        console.log('ajax, baby!')
      }
    })
  // }

  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for(var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      addRestroom(results[i]);
      placeResult(results[i]);
    }
  }
}

function createMarker(place) {
  // var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    animation: google.maps.Animation.DROP,
    icon: icons[place.types[0]].icon
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(
      '<div id="infowindow-content">' +
      '<h4>' + place.name + '</h4>' +
      '<p>Address: ' + place.vicinity + '</p>' +
      '</div>'
    );
    infowindow.open(map, this);
  });

  markers.push(marker);

  // for(var i = 0; i < place.length; i++) {
    $('#restroom-result').on('click', function() {
        google.maps.event.trigger(marker, 'click');
    });
  // }
}

function addRestroom(place, i) {
  console.log('render me restrooms');

  var $restrooms = $('#restrooms')
  var $restroomResult = $('<ul id="restroom-result" class="col-xs-6"></ul>')
  var $restroomLi = $(
    '<li>' + place.name + '</li>' +
    '<li>Address: ' + place.vicinity + '</li>' +
    '<li>Category: ' + place.types[0] + '</li><br>'
  );

  $restrooms.append($restroomResult);
  $restroomResult.append($restroomLi);
}

function placeResult(place, i) {

}

function performSearch() {
  var starbucks = {
    bounds: map.getBounds(),
    keyword: 'starbucks'
  };
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(starbucks, handleSearchResults);

  var park = {
    bounds: map.getBounds(),
    keyword: 'park'
  };
  var service1 = new google.maps.places.PlacesService(map);
  service1.nearbySearch(park, handleSearchResults);

  var hotel = {
    bounds: map.getBounds(),
    keyword: 'hotel'
  };
  var service2 = new google.maps.places.PlacesService(map);
  service2.nearbySearch(hotel, handleSearchResults);

  var dept_store = {
    bounds: map.getBounds(),
    keyword: 'department store'
  };
  var service3 = new google.maps.places.PlacesService(map);
  service3.nearbySearch(dept_store, handleSearchResults);

  var nyu_school = {
    bounds: map.getBounds(),
    keyword: 'nyu school'
  };
  var service4 = new google.maps.places.PlacesService(map);
  service4.nearbySearch(nyu_school, handleSearchResults);

  var bedbathbey = {
    bounds: map.getBounds(),
    keyword: 'bed bath beyond'
  };
  var service5 = new google.maps.places.PlacesService(map);
  service5.nearbySearch(bedbathbey, handleSearchResults);

  var barnes_noble = {
    bounds: map.getBounds(),
    keyword: 'barnes and noble'
  };
  var service6 = new google.maps.places.PlacesService(map);
  service6.nearbySearch(barnes_noble, handleSearchResults);

  var newschool = {
    bounds: map.getBounds(),
    name: 'the new school'
  };
  var service7 = new google.maps.places.PlacesService(map);
  service7.nearbySearch(newschool, handleSearchResults);

  var found_cen = {
    bounds: map.getBounds(),
    name: 'foundation+center'
  };
  var service8 = new google.maps.places.PlacesService(map);
  service8.nearbySearch(found_cen, handleSearchResults);

  var film_cen = {
    bounds: map.getBounds(),
    name: 'angelika'
  };
  var service9 = new google.maps.places.PlacesService(map);
  service9.nearbySearch(film_cen, handleSearchResults);

  var grand_central = {
    bounds: map.getBounds(),
    name: 'grand central terminal'
  };
  var service10 = new google.maps.places.PlacesService(map);
  service10.nearbySearch(grand_central, handleSearchResults);
}

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

  function onPlaceChanged() {
    var place = autocomplete.getPlace();
      if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(15);
        search();
      }
  }

  function search() {
    var starbucks = {
      bounds: map.getBounds(),
      keyword: 'starbucks'
    };
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(starbucks, handleSearchResults);

    var park = {
      bounds: map.getBounds(),
      keyword: 'park'
    };
    var service1 = new google.maps.places.PlacesService(map);
    service1.nearbySearch(park, handleSearchResults);

    var hotel = {
      bounds: map.getBounds(),
      keyword: 'hotel'
    };
    var service2 = new google.maps.places.PlacesService(map);
    service2.nearbySearch(hotel, handleSearchResults);

    var dept_store = {
      bounds: map.getBounds(),
      keyword: 'department store'
    };
    var service3 = new google.maps.places.PlacesService(map);
    service3.nearbySearch(dept_store, handleSearchResults);

    var nyu_school = {
      bounds: map.getBounds(),
      keyword: 'nyu school'
    };
    var service4 = new google.maps.places.PlacesService(map);
    service4.nearbySearch(nyu_school, handleSearchResults);

    var bedbathbey = {
      bounds: map.getBounds(),
      keyword: 'bed bath beyond'
    };
    var service5 = new google.maps.places.PlacesService(map);
    service5.nearbySearch(bedbathbey, handleSearchResults);

    var barnes_noble = {
      bounds: map.getBounds(),
      keyword: 'barnes and noble'
    };
    var service6 = new google.maps.places.PlacesService(map);
    service6.nearbySearch(barnes_noble, handleSearchResults);

    var newschool = {
      bounds: map.getBounds(),
      name: 'the new school'
    };
    var service7 = new google.maps.places.PlacesService(map);
    service7.nearbySearch(newschool, handleSearchResults);

    var found_cen = {
      bounds: map.getBounds(),
      name: 'foundation center'
    };
    var service8 = new google.maps.places.PlacesService(map);
    service8.nearbySearch(found_cen, handleSearchResults);

    var film_cen = {
      bounds: map.getBounds(),
      name: 'angelika film center'
    };
    var service9 = new google.maps.places.PlacesService(map);
    service9.nearbySearch(film_cen, handleSearchResults);

    var grand_central = {
      bounds: map.getBounds(),
      name: 'grand central terminal'
    };
    var service10 = new google.maps.places.PlacesService(map);
    service10.nearbySearch(grand_central, handleSearchResults);
  }

  infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    position: currentLocation,
    map: map,
    animation: google.maps.Animation.DROP
  });

  // this ensures we wait until the map bounds are initialized
  // before we perform the search
  google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);


  // redo search when the refresh button is clicked
  $('#refresh').click(performSearch), function(e){
    e.preventDefault();
  }
}

$(document).ready(function() {
  $.ajax({
    url: '/logged_in',
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    datatype: 'json',
    success: function(data){
      if(data){
        navigator.geolocation.getCurrentPosition(initialize);
        // navigator.geolocation.getCurrentPosition(addRestroom);
      }
    }
  });
});
