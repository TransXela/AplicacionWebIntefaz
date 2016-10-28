'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:AdminUsuariosCtrl
 * @description
 * # AdminUsuariosCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('AdminListadueCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants, $cookies) {
    // $scope.apiurl = 'http://'+ $cookies.getObject('user').apiurl +':8000';
    // $scope.apiurl = 'http://127.0.0.1:8000';
    // $scope.gridOptions = {};
    // var res = $http.get($scope.apiurl+'/admin/duenio/lista');
    //   res.success(function(response, status, headers, config) {
    //     $scope.duenios = response;
    //
    //
    //         $scope.gridOptions.data = $scope.duenios;
    //         $scope.gridOptions.columnDefs = [
    //           {name:'Nombre',field:'nombre'},
    //           {name:'Apellidos',field:'apellidos'},
    //           {name:'Empresa',field:'empresa'},
    //           {name:'Estado',field:'estado'}
    //           ];
    //   });
    //   res.error(function(response, status, headers, config) {
    //     $location.url('/404');
    //   });

    $scope.apiurl = 'http://127.0.0.1:8000';
    var res = $http.get($scope.apiurl+'/admin/duenio/lista');
      res.success(function(response, status, headers, config) {
        $scope.datos = response;
        $scope.gridOptions.data = response;
        // data.forEach( function addDates( row, index ){
        //   row.estado = row.estado==='1' ? '1' : '2';
        // });
      });
      res.error(function(response, status, headers, config) {
        $location.url('/404');
      });


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

        {name: 'Nombre', field: 'nombre', headerCellClass: $scope.highlightFilteredHeader },

        {name: 'Apellidos', field: 'apellidos', headerCellClass: $scope.highlightFilteredHeader },



        {name: 'Estado', field: 'estado', filter: {
            term: '1',
            type: uiGridConstants.filter.SELECT,
            selectOptions: [ { value: '1', label: '1' }]
          },
          cellFilter: 'mapGender2', headerCellClass: $scope.highlightFilteredHeader },

          {name: 'Empresa', field: 'empresa', headerCellClass: $scope.highlightFilteredHeader },

          {name:'Descripcion',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idduenio)">Ver detalles</button></div>', enableFiltering: false}

      ]
    };

    $scope.gridOptions.columnDefs[2].visible = false;
    // $scope.gridOptions.columnDefs[3].visible = false;
    // $scope.gridOptions.columnDefs[4].visible = false;





    // $http.get('http://localhost:9000/json/lista.json')
    //   .success(function(data) {
    //     $scope.gridOptions.data = data;
    //
    //
    //     data.forEach( function addDates( row, index ){
    //
    //       row.tipo = row.tipo==='dueño' ? '1' : '2';
    //       row.estado = row.estado==='1' ? '1' : '2';
    //     });
    //   });

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
});
