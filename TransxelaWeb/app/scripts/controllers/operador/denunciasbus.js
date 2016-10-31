'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:OperadorDenunciasbusCtrl
 * @description
 * # OperadorDenunciasbusCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('OperadorDenunciasbusCtrl', function ($scope, apiService, denunciaService, $cookies, $location) {
  if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
    $scope.token = $cookies.getObject('user').token;
    $scope.usuario = $cookies.getObject('user').usuario;
    $scope.idruta = denunciaService.getRuta();
    $scope.idbus = denunciaService.getBus();
    $scope.gridOptions = {};
    apiService.obtener('/denuncias/ruta/'+$scope.idruta+'/'+$scope.token).
    success(function(response, status, headers, config) {
      $scope.denuncias = response.buses;
      $scope.ruta = response.ruta[0];
      $scope.gridOptions.data = $scope.denuncias;
      $scope.gridOptions.enableFiltering = true;
      $scope.gridOptions.columnDefs = [
        {name:'Bus',field:'placa' },
        {name:'No. de denuncias',field:'numdenuncias'},
        {name:' ',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showBus(row.entity.idbus)">Ver detalles</button></div>', enableFiltering: false}
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
    denunciaService.setRuta($scope.ruta.idruta);
    denunciaService.setBus(id);
    $location.url('/operador/denunciasBus');
  };

  $scope.cerrar = function(){
    $cookies.remove('user');
    $location.url('/');
  };
});
