'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPerfilCtrl
 * @description
 * # DuenioPerfilCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('DuenioPerfilCtrl', function ($scope, $resource) {
  var resource = $resource('http://127.0.0.1:8000/duenio/2');
  resource.get({
    fakeOptionalParameter : '/error'
  }, function(value) {
    $scope.duenio = value;
  }, function(httpResponse) {
    $scope.estado = httpResponse.status;
  });
});