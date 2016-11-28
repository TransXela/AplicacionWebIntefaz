'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('VerActividadesCtrl', function ($scope, $uibModal, $cookies, $location, apiService,uiGridConstants) {
      var d= new Date();
      $scope.actividadvalidas=[];
      if(typeof $cookies.getObject('user') !== 'undefined' && $cookies.getObject('user')){
      $scope.idusuario = $cookies.getObject('user').id;
      $scope.token = $cookies.getObject('user').token;
      $scope.gridOptions = {};
      console.log($cookies.getObject('user').token);
      console.log("/cultura/actividad/?tk="+$scope.token);
      apiService.obtener("/cultura/actividad/?tk=" + $scope.token).
      success(function(response, status, headers, config){
        $scope.actividades = response;
        console.log($scope.actividades);
        for(var i=0;i<$scope.actividades.length;i++){
            if(Date.parse($scope.actividades[i].fecha)>=Date.parse(d)){
                $scope.actividadvalidas.push($scope.actividades[i]);
            }
        }
        $scope.gridOptions.data=$scope.actividadvalidas;
        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.paginationPageSizes = [10, 25, 50];
        $scope.gridOptions.paginationPageSize = 10;
        $scope.gridOptions.columnDefs = [
              {name: 'Nombre actividad', field: 'nombre'},
              {name: 'Descripcion actividad', field:'descripcion'},
              {name: 'Fecha', field:'fecha'},
              {name: 'Direccion', field:'direccion'},
              {name: 'Lugar', field:'lugar'},
              {name: 'Estado', field:'estado', filter:{term:'true'}, visible:false}

          ];
        }).
        error(function(response, status, headers, config) {
          switch(status) {
            case 400: {
              $location.url('/404');
              break;
            }
            case 403: {
              $location.url('/403');
              break;
            }
            case 404: {
              $location.url('/404');
              break;
            }
            default: {
              $location.url('/500');
            }
          }
        });
    }
          else {
                 $location.url('/login');
          }


  });
