'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:AdminUsuariosCtrl
 * @description
 * # AdminUsuariosCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('AdminListapmtCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {



    $scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
      if( col.filters[0].term ){
        return 'header-filtered';
      } else {
        return '';
      }
    };



    $scope.gridOptions = {
      enableFiltering: true,
      showGridFooter: true,
      showColumnFooter: true,

      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      },
      columnDefs: [
        // default
        { field: 'id', headerCellClass: $scope.highlightFilteredHeader },
        // pre-populated search field

        { field: 'nombre', headerCellClass: $scope.highlightFilteredHeader },

        { field: 'apellido', headerCellClass: $scope.highlightFilteredHeader },

        { field: 'tipo', filter: {
            term: '1',
            type: uiGridConstants.filter.SELECT,
            selectOptions: [ { value: '1', label: 'pmt' }]
          },
          cellFilter: 'mapGender', headerCellClass: $scope.highlightFilteredHeader },

        { field: 'estado', filter: {
            term: '1',
            type: uiGridConstants.filter.SELECT,
            selectOptions: [ { value: '1', label: '1' }]
          },
          cellFilter: 'mapGender2', headerCellClass: $scope.highlightFilteredHeader },

          { field: 'telefono', headerCellClass: $scope.highlightFilteredHeader },

      ]
    };

    $scope.gridOptions.columnDefs[0].visible = false;
    $scope.gridOptions.columnDefs[3].visible = false;
    $scope.gridOptions.columnDefs[4].visible = false;

    $http.get('http://localhost:9000/json/lista.json')
      .success(function(data) {
        $scope.gridOptions.data = data;


        data.forEach( function addDates( row, index ){

          row.tipo = row.tipo==='pmt' ? '1' : '2';
          row.estado = row.estado==='1' ? '1' : '2';
        });
      });

    $scope.toggleFiltering = function(){
      $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
      $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
    };



  }])

  .filter('mapGender2', function() {
  var genderHash2 = {
    1: '1',
    2: '0',
  };

  return function(input) {
    if (!input){
      return '';
    } else {
      return genderHash2[input];
    }
  };
})

  .filter('mapGender', function() {
  var genderHash = {
    1: 'pmt',
    2: 'administrador',
  };

  return function(input) {
    if (!input){
      return '';
    } else {
      return genderHash[input];
    }
  };
});
