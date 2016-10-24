'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPerfilCtrl
 * @description
 * # DuenioPerfilCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('DuenioPerfilCtrl', function ($scope, $resource, $cookies) {
  $scope.idduenio = $cookies.getObject('user').id;
  var resource = $resource('http://127.0.0.1:8000/duenio/'+$scope.idduenio);
  $scope.duenio = resource.get(function() {
  }, function(response) {
    $location.url('/404');
  });
});
