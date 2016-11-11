'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:OperadorDenunciasbusCtrl
 * @description
 * # OperadorDenunciasbusCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('OperadorDenunciasbusCtrl', function ($scope, apiService, $cookies, $location, uiGridConstants) {
  if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
    $scope.token = $cookies.getObject('user').token;
    $scope.usuario = $cookies.getObject('user').usuario;
    $scope.idruta = $cookies.get('idruta');
    $scope.idbus = $cookies.get('idbus');
    $scope.gridOptions = {};
    apiService.obtener('/denuncias/ruta/bus/'+$scope.idbus+'/'+$scope.token).
    success(function(response, status, headers, config) {
      $scope.denuncias = response.TiposDenuncia;
      $scope.bus = response.bus;
      $scope.gridOptions.data = $scope.denuncias;
      $scope.gridOptions.enableFiltering = true;
      $scope.gridOptions.columnDefs = [
        {name:'Tipo denuncia',field:'descripcion' },
        {name:'No. de denuncias',field:'NumeroDenuncias', enableFiltering: false, sort: { direction: uiGridConstants.DESC }},
        {name:' ',cellTemplate:'<div class="wrapper text-center"><button class="btn btn-info btn-sm" ng-click="grid.appScope.showTD(row.entity.idtipoDenuncia)">Ver más</button></div>', enableFiltering: false}
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
    $cookies.remove('idtipo');
    $cookies.put('idtipo', id);
    $location.url('/operador/denunciasTipo');
  };

  $scope.cerrar = function(){
    $cookies.remove('user');
    $cookies.remove('idruta');
    $cookies.remove('idtipo');
    $location.url('/');
  };
});
