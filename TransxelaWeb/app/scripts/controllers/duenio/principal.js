'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPrincipalCtrl
 * @description
 * # DuenioPrincipalCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('DuenioPrincipalCtrl', function ($scope, $resource, $location) {
  	var resource = $resource('http://127.0.0.1:8000/duenio/1/principal');
  	$scope.duenio = resource.get(function() {
    }, function(response) {
      $location.url('/404');
    });
  });
