'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioCalendarioCtrl
 * @description
 * # DuenioCalendarioCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioCalendarioCtrl', function ($scope, $resource) {
  var resource = $resource('http://127.0.0.1:8000/duenio/2');
  resource.get({
    fakeOptionalParameter : '/error'
  }, function(value) {
    $scope.usuario = value;
  }, function(httpResponse) {
    $scope.estado = httpResponse.status;
  });
});