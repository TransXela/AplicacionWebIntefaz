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
  //$scope.apiurl = 'http://127.0.0.1:8000';
  $scope.apiurl = 'http://'+ $cookies.getObject('user').apiurl +':8000';
  var resource = $resource($scope.apiurl+'/duenio/'+$scope.idduenio);
  $scope.duenio = resource.get(function() {
  }, function(response) {
    $location.url('/404');
  });
});
