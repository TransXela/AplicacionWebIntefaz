'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPerfilCtrl
 * @description
 * # DuenioPerfilCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('DuenioPerfilCtrl', function ($scope, apiService, $cookies) {
  $scope.idduenio = $cookies.getObject('user').id;
  apiService.obtener('/duenio/'+$scope.idduenio).
  success(function(response, status, headers, config) {
    $scope.duenio = response;
  }).
  error(function(response, status, headers, config) {
    $location.url('/404');
  });
});
