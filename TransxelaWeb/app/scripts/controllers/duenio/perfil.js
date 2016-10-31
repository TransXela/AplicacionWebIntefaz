'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPerfilCtrl
 * @description
 * # DuenioPerfilCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioPerfilCtrl', function ($scope, apiService, $cookies) {
    if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
      $scope.idduenio = $cookies.getObject('user').id;
      $scope.token = $cookies.getObject('user').token;
      apiService.obtener('/duenio/'+$scope.idduenio + '/' + $scope.token).
      success(function(response, status, headers, config) {
        $scope.duenio = response;
      }).
      error(function(response, status, headers, config) {
        if(status === null || status === -1){
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
