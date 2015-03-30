angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $mdSidenav, uiGmapGoogleMapApi, $cordovaGeolocation, $http, StoreServiceApiUrl, $mdBottomSheet) {
  
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.openBottomSheet = function() {
    $mdBottomSheet.show({
      template: '<md-bottom-sheet>Hello!</md-bottom-sheet>'
    });
  };


  var watchOptions = {
    frequency : 1000,
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      console.log(err);
      $scope.map.center.latitude = 52;
      $scope.map.center.longitude = 13;

      $scope.currentPositionMarker();
    },
    function(position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude

      $scope.map.center.latitude = lat;
      $scope.map.center.longitude = long;

      // update current position marker
      $scope.currentPositionMarker();
  });

  $scope.map = { 
    center: { latitude: 52, longitude: 13 }, 
    zoom: 10, 
    options: { scrollwheel: false, disableDefaultUI: true, draggable: true, scrollwheel: true },
    events: {
      tilesloaded: function (mapModel, eventName, originalEventArgs) {
        $scope.getData()
        $scope.$apply();
      }

    },
    markers: [],
    bounds: {},
    currentPos: {
    	id: 'currentpos',
		coords: {
			latitude: 52,
			longitude: 13
		},
		options: { draggable: false, clickable: false, zIndex: 1000 },
		events: {
	      
	    }
	}
  };

  $scope.currentPositionMarker = function(){
  	$scope.map.currentPos.coords.latitude = $scope.map.center.latitude;
  	$scope.map.currentPos.coords.longitude = $scope.map.center.longitude;
  }

  $scope.getData = function(){
    $scope.map.markers = [];

    var NorthEastLat = $scope.map.bounds.northeast.latitude;
    var NorthEastLng = $scope.map.bounds.northeast.longitude;
    var SouthWestLat = $scope.map.bounds.southwest.latitude;
    var SouthWestLng = $scope.map.bounds.southwest.longitude;

    $http.get('/js/test.json').
    success(function(data, status, headers, config) {
      
      _.each(data, function(value,index){

        var newMarker = {
          id: value.id,
          latitude: value.lat,
          longitude: value.lng,
          title: value.title,
          icon: '/img/bzMarker.png'
        } 
        $scope.map.markers.push(newMarker);
      });

    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

    // $http.get(StoreServiceApiUrl+'filialfinder/get_stores?map_bounds=(('+NorthEastLat+','+NorthEastLng+'),('+SouthWestLat+','+SouthWestLng+'))').
    // success(function(data, status, headers, config) {
      // _.each(data, function(value,index){

      //     var newMarker = {
      //       id: value.id,
      //       latitude: value.lat,
      //       longitude: value.lng,
      //       title: value.title,
      //       icon: '/img/bzMarker.png'
      //     } 
      //     $scope.map.markers.push(newMarker);
      // });
    // }).
    // error(function(data, status, headers, config) {
    //   // called asynchronously if an error occurs
    //   // or server returns response with an error status.
    // });
  }


  uiGmapGoogleMapApi.then(function(maps) {
    maps.visualRefresh = true;
    
    




  })

 
})

.controller('MapCtrl', function($scope) {
  
  console.log('MapContrl');
 
})