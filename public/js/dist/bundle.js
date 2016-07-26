/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _mapStyle = __webpack_require__(1);

	var cityMap = {
	  banchiou: {
	    center: {
	      lat: 25.0133165,
	      lng: 121.4646671
	    },
	    population: 5000
	  }
	};

	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	  infoWindow.setPosition(pos);
	  infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
	}

	function initMap() {
	  var customMapType = new google.maps.StyledMapType(_mapStyle.mapStyle, {
	    name: 'Custom Style'
	  });
	  var customMapTypeId = 'custom_style';

	  var map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 12,
	    center: { lat: 40.674, lng: -73.946 }, // Brooklyn.
	    mapTypeControlOptions: {
	      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
	    }
	  });
	  map.mapTypes.set(customMapTypeId, customMapType);
	  map.setMapTypeId(customMapTypeId);

	  var infoWindow = new google.maps.InfoWindow({ map: map });

	  // Try HTML5 geolocation.
	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function (position) {
	      var pos = {
	        lat: position.coords.latitude,
	        lng: position.coords.longitude
	      };

	      infoWindow.setPosition(pos);
	      infoWindow.setContent("Hey! I'm here!!");
	      map.setCenter(pos);
	    }, function () {
	      handleLocationError(true, infoWindow, map.getCenter());
	    });
	  } else {
	    // Browser doesn't support Geolocation
	    handleLocationError(false, infoWindow, map.getCenter());
	  }

	  for (var city in cityMap) {
	    var cityCicle = new google.maps.Circle({
	      strokeCOlor: '#ff00000',
	      strokeOpacity: 0.8,
	      strokeWeight: 2,
	      fillColor: '#ff0000',
	      filleOpacity: 0.35,
	      map: map,
	      center: cityMap[city].center,
	      radius: Math.sqrt(cityMap[city].population) * 20
	    });
	  }

	  // Create the search box and link it to the UI element.
	  var input = document.getElementById('pac-input');
	  var searchBox = new google.maps.places.SearchBox(input);
	  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	  // Bias the SearchBox results towards current map's viewport.
	  map.addListener('bounds_changed', function () {
	    searchBox.setBounds(map.getBounds());
	  });

	  var markers = [];
	  // [START region_getplaces]
	  // Listen for the event fired when the user selects a prediction and retrieve
	  // more details for that place.
	  searchBox.addListener('places_changed', function () {
	    var places = searchBox.getPlaces();

	    if (places.length === 0) {
	      return;
	    }

	    // Clear out the old markers.
	    markers.forEach(function (marker) {
	      marker.setMap(null);
	    });
	    markers = [];

	    // For each place, get the icon, name and location.
	    var bounds = new google.maps.LatLngBounds();
	    places.forEach(function (place) {
	      var icon = {
	        url: place.icon,
	        size: new google.maps.Size(71, 71),
	        origin: new google.maps.Point(0, 0),
	        anchor: new google.maps.Point(17, 34),
	        scaledSize: new google.maps.Size(25, 25)
	      };

	      // Create a marker for each place.
	      markers.push(new google.maps.Marker({
	        map: map,
	        icon: icon,
	        title: place.name,
	        position: place.geometry.location
	      }));

	      if (place.geometry.viewport) {
	        // Only geocodes have viewport.
	        bounds.union(place.geometry.viewport);
	      } else {
	        bounds.extend(place.geometry.location);
	      }
	    });
	    map.fitBounds(bounds);
	  });
	  // [END region_getplaces]
	}

	window.initMap = initMap;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var mapStyle = exports.mapStyle = [{
	  featureType: 'all',
	  elementType: 'labels.text.fill',
	  stylers: [{
	    color: '#ffffff'
	  }]
	}, {
	  featureType: 'all',
	  elementType: 'labels.text.stroke',
	  stylers: [{
	    color: '#000000'
	  }, {
	    lightness: 13
	  }]
	}, {
	  featureType: 'administrative',
	  elementType: 'geometry.fill',
	  stylers: [{
	    color: '#000000'
	  }]
	}, {
	  featureType: 'administrative',
	  elementType: 'geometry.stroke',
	  stylers: [{
	    color: '#144b53'
	  }, {
	    lightness: 14
	  }, {
	    weight: 1.4
	  }]
	}, {
	  featureType: 'landscape',
	  elementType: 'all',
	  stylers: [{
	    color: '#08304b'
	  }]
	}, {
	  featureType: 'landscape',
	  elementType: 'geometry.fill',
	  stylers: [{
	    color: '#101021'
	  }]
	}, {
	  featureType: 'landscape.natural.terrain',
	  elementType: 'geometry.fill',
	  stylers: [{
	    color: '#101021'
	  }]
	}, {
	  featureType: 'poi',
	  elementType: 'geometry',
	  stylers: [{
	    color: '#0c4152'
	  }, {
	    lightness: 5
	  }]
	}, {
	  featureType: 'road.highway',
	  elementType: 'geometry.fill',
	  stylers: [{
	    color: '#000000'
	  }]
	}, {
	  featureType: 'road.highway',
	  elementType: 'geometry.stroke',
	  stylers: [{
	    color: '#0b434f'
	  }, {
	    lightness: 25
	  }]
	}, {
	  featureType: 'road.arterial',
	  elementType: 'geometry.fill',
	  stylers: [{
	    color: '#000000'
	  }]
	}, {
	  featureType: 'road.arterial',
	  elementType: 'geometry.stroke',
	  stylers: [{
	    color: '#0b3d51'
	  }, {
	    lightness: 16
	  }]
	}, {
	  featureType: 'road.local',
	  elementType: 'geometry',
	  stylers: [{
	    color: '#000000'
	  }]
	}, {
	  featureType: 'transit',
	  elementType: 'all',
	  stylers: [{
	    color: '#146474'
	  }]
	}, {
	  featureType: 'water',
	  elementType: 'all',
	  stylers: [{
	    color: '#021019'
	  }]
	}];

/***/ }
/******/ ]);