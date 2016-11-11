'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:OperadorDenunciasrutaCtrl
 * @description
 * # OperadorDenunciasrutaCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('OperadorDenunciasrutaCtrl', function ($scope, apiService, $cookies, $location, uiGridConstants) {
    if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
      $scope.token = $cookies.getObject('user').token;
      $scope.usuario = $cookies.getObject('user').usuario;
      $scope.idruta = $cookies.get('idruta');
      $scope.gridOptions = {};
      apiService.obtener('/denuncias/ruta/'+$scope.idruta+'/'+$scope.token).
      success(function(response, status, headers, config) {
        $scope.denuncias = response.buses;
        $scope.ruta = response.ruta[0];
        $scope.gridOptions.data = $scope.denuncias;
        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.columnDefs = [
          {name:'Bus',field:'placa' },
          {name:'No. de denuncias',field:'numdenuncias', enableFiltering: false, sort: { direction: uiGridConstants.DESC }},
          {name:' ',cellTemplate:'<div class="wrapper text-center"><button class="btn btn-info btn-sm" ng-click="grid.appScope.showBus(row.entity.idbus)">Ver más</button></div>', enableFiltering: false}
        ];
      }).
      error(function(response, status, headers, config) {
        if(status === null || status === -1){
          $location.url('/404');
        }
        else if(status === 401){
          $location.url('/403');
        }
      });
    }
    else{
      $location.url('/login');
    }

    $scope.showBus = function(id){
      $cookies.remove('idbus');
      $cookies.put('idbus', id);
      $location.url('/operador/denunciasBus');
    };

    $scope.cerrar = function(){
      $cookies.remove('user');
      $cookies.remove('idruta');
      $cookies.remove('idbus');
      $location.url('/');
    };
  });
