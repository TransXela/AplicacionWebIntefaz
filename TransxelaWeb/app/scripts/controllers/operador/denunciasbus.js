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
    apiService.obtener('/denuncias/ruta/bus/'+$scope.idbus+'/'+$scope.token).
    success(function(response, status, headers, config) {
      $scope.denuncias = response.TiposDenuncia;
      $scope.bus = response.bus;
      $scope.gridOptions.data = $scope.denuncias;
      $scope.gridOptions.enableFiltering = true;
      $scope.gridOptions.columnDefs = [
        {name:'Tipo denuncia',field:'descripcion' },
        {name:'No. de denuncias',field:'NumeroDenuncias', enableFiltering: false},
        {name:' ',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showTD(row.entity.idtipoDenuncia)">Ver detalles</button></div>', enableFiltering: false}
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

  $scope.showTD = function(id){
    denunciaService.setRuta($scope.idruta);
    denunciaService.setBus($scope.bus.idbus);
    denunciaService.setTipo(id);
    $location.url('/operador/denunciasTipo');
  };

  $scope.cerrar = function(){
    $cookies.remove('user');
    $location.url('/');
  };
});
