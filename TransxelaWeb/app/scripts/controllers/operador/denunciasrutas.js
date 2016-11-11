'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:OperadorDenunciasrutasCtrl
 * @description
 * # OperadorDenunciasrutasCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('OperadorDenunciasrutasCtrl', function ($scope, apiService, $cookies, $location, uiGridConstants) {
    if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
      $cookies.remove('idruta');
      $cookies.remove('idbus');
      $cookies.remove('idtipo');
      $scope.token = $cookies.getObject('user').token;
      $scope.usuario = $cookies.getObject('user').usuario;
      $scope.gridOptions = {};
      apiService.obtener('/denuncias/rutas/'+$scope.token).
      success(function(response, status, headers, config) {
        $scope.denuncias = response.rutas;
        $scope.gridOptions.data = $scope.denuncias;
        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.columnDefs = [
          {name:'Ruta',field:'nombre' },
          {name:'No. de denuncias',field:'TotalDenuncias', enableFiltering: false, sort: { direction: uiGridConstants.DESC }},
          {name:' ',cellTemplate:'<div class="wrapper text-center"><button class="btn btn-info btn-sm" ng-click="grid.appScope.showRuta(row.entity.idruta)">Ver más</button></div>', enableFiltering: false}
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

    $scope.showRuta = function(id){
      $cookies.remove('idruta');
      $cookies.put('idruta', id);
      $location.url('/operador/denunciasRuta');
    };

    $scope.cerrar = function(){
      $cookies.remove('user');
      $cookies.remove('idruta');
      $location.url('/');
    };
  });
