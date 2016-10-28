'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPerfilCtrl
 * @description
 * # DuenioPerfilCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('DuenioPerfilCtrl', function ($scope, $http, $cookies) {
  $scope.idduenio = $cookies.getObject('user').id;
  //$scope.apiurl = 'http://127.0.0.1:8000';
  $scope.apiurl = 'http://'+ $cookies.getObject('user').apiurl +':8000';
  var res = $http.get($scope.apiurl+'/duenio/'+$scope.idduenio);
    res.success(function(response, status, headers, config) {
      $scope.duenio = response;
    });
    res.error(function(response, status, headers, config) {
      $location.url('/404');
    });
});
