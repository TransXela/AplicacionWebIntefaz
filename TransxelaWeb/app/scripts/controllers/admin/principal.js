'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:AdminPrincipalCtrl
 * @description
 * # AdminPrincipalCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('AdminPrincipalCtrl', function ($scope, apiService, $location, $cookies) {

    if(typeof $cookies.getObject('user') !== 'undefined' && $cookies.getObject('user')){
      $scope.idadmin = $cookies.getObject('user').id;
      $scope.token = $cookies.getObject('user').token;
      apiService.obtener('/users/'+$scope.idadmin + '/?tk=' + $scope.token).
      success(function(response, status, headers, config) {
        $scope.admin = response;
      }).
      error(function(response, status, headers, config) {
        switch(status) {
          case 400: {
            $location.url('/404');
            break;
          }
          case 403: {
            $location.url('/403');
            break;
          }
          case 404: {
            $location.url('/404');
            break;
          }
          default: {
            $location.url('/500');
          }
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
