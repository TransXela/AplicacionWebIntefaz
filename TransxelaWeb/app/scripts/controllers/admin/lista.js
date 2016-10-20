'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:AdminListaCtrl
 * @description
 * # AdminListaCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('AdminListaCtrl', ['$scope', '$interval', 'uiGridConstants', '$http', function ($scope, $interval, uiGridConstants, $http) {

    var data = [];

    $scope.gridOptions = {
        showGridFooter: true,
        showColumnFooter: true,
        enableFiltering: true,

        data: data,
        onRegisterApi: function(gridApi) {
                $scope.gridApi = gridApi;
        }
    };

    $scope.toggleFooter = function() {
      $scope.gridOptions.showGridFooter = !$scope.gridOptions.showGridFooter;
      $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    };

    $scope.toggleColumnFooter = function() {
      $scope.gridOptions.showColumnFooter = !$scope.gridOptions.showColumnFooter;
      $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    };

    $http.get('http://localhost:9000/json/lista.json')
      .success(function(data) {
        // data.forEach( function(row) {
        //   row.registered = Date.parse(row.registered);
        // });
        $scope.gridOptions.data = data;
      });



    // $http.get('http://localhost:9000/json/lista.json').success(function(data){
    //   $scope.admins = data
    // })
    // $scope.gridOptions = {
    //   data: 'admins'
    // };
    //
    // $http.get('http://localhost:9000/json/lista.json')
    // .success(function(data) {
    //   data.forEach( function(row) {
    //     row.registered = Date.parse(row.registered);
    //   });
    //   $scope.gridOptions.data = data;
    // });

  }]);
