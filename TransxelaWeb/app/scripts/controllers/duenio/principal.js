'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPrincipalCtrl
 * @description
 * # DuenioPrincipalCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioPrincipalCtrl', function ($scope, apiService, $location, $cookies) {
  $cookies.putObject('user', {"token": "f02472ca6c3684ed0954370161e168fbdf31a8da", "id": 1});
  $scope.idduenio = $cookies.getObject('user').id;
  apiService.obtener('/duenio/'+$scope.idduenio+'/principal').
  success(function(response, status, headers, config){
    $scope.duenio = response;
  }).
  error(function(response, status, headers, config) {
    // console.log(response);
    // console.log(status);
    // console.log(headers);
    // console.log(config);
    if(status === null || status === -1){
      $location.url('/404');
    }
    else if(status === 401){
      $location.url('/403');
    }
  });
});
