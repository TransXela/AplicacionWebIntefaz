'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPrincipalCtrl
 * @description
 * # DuenioPrincipalCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioPrincipalCtrl', function ($scope, apiService, $location, $cookies) {
  if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
    $scope.idduenio = $cookies.getObject('user').id;
    $scope.token = $cookies.getObject('user').token;
    apiService.obtener('/duenio/'+$scope.idduenio+'/principal' + '/' + $scope.token).
    success(function(response, status, headers, config){
      $scope.duenio = response;
    }).
    error(function(response, status, headers, config) {
      if(status === null || status === -1 || status === 404){
        $location.url('/404');
      }
      else if(status === 401){
        $location.url('/403');
      }
    });
  }
  else{
    $location.url('/login');
  }

  $scope.cerrar = function(){
    $cookies.remove('user');
    $location.url('/');
  };
});
