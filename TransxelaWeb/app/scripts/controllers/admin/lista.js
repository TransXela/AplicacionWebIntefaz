'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:AdminListaCtrl
 * @description
 * # AdminListaCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('AdminListaCtrl', function ($scope,$http) {
    $http.get('http://localhost:9000/json/lista.json').success(function(data){
      $scope.admins = data
    })
    $scope.gridOptions = {
      data: 'admins'
    };
  });
