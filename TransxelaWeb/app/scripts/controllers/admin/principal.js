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
    $scope.cerrar = function(){
      $cookies.remove('user');
      $location.url('/');
    };
  });
