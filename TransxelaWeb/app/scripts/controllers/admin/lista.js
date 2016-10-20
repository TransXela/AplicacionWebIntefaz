// 'use strict';
//
// /**
//  * @ngdoc function
//  * @name transxelaWebApp.controller:AdminListaCtrl
//  * @description
//  * # AdminListaCtrl
//  * Controller of the transxelaWebApp
//  */
angular.module('transxelaWebApp', ['ui.grid.selection'])
  .controller('AdminListaCtrl', ['$scope', '$interval', 'uiGridConstants', '$http', function ($scope, $interval, uiGridConstants, $http) {

    var data = [];

    $scope.gridOptions = {
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        showGridFooter: true,
        //showColumnFooter: true,
        enableFiltering: true,

        data: data,
        onRegisterApi: function(gridApi) {
                $scope.gridApi = gridApi;
        }
    };

    $scope.gridOptions.noUnselect = true;
    $scope.gridOptions.multiSelect = false;
    $scope.gridOptions.modifierKeysToMultiSelect = false;

    $scope.toggleFooter = function() {
      $scope.gridOptions.showGridFooter = !$scope.gridOptions.showGridFooter;
      $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    };

    $scope.toggleColumnFooter = function() {
      $scope.gridOptions.showColumnFooter = !$scope.gridOptions.showColumnFooter;
      $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    };

    $scope.toggleRowSelection = function() {
    $scope.gridApi.selection.clearSelectedRows();
    $scope.gridOptions.enableRowSelection = !$scope.gridOptions.enableRowSelection;
    $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.OPTIONS);
  };

    $http.get('http://localhost:9000/json/lista.json')
      .success(function(data) {
        // data.forEach( function(row) {
        //   row.registered = Date.parse(row.registered);
        // });
        $scope.gridOptions.data = data;

        // $interval whilst we wait for the grid to digest the data we just gave it
        $interval( function() {$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);}, 0, 1);
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
