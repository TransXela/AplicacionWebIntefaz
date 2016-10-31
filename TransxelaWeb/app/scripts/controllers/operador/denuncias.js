'use strict';

/**
* @ngdoc function
* @name transxelaWebApp.controller:OperadorDenunciasCtrl
* @description
* # OperadorDenunciasCtrl
* Controller of the transxelaWebApp
*/
angular.module('transxelaWebApp').controller('OperadorDenunciasCtrl', function ($scope, apiService, $cookies) {
  if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
    $scope.token = $cookies.getObject('user').token;
    $scope.usuario = $cookies.getObject('user').usuario;
    $scope.gridOptions = {};
    apiService.obtener('/denuncias/'+$scope.token).
    success(function(response, status, headers, config) {
      $scope.denuncias = response.denuncias;
      $scope.gridOptions.data = $scope.denuncias;
      $scope.gridOptions.enableFiltering = true;
      $scope.gridOptions.columnDefs = [
        {name:'Fecha',field:'denuncia.fechahora' },
        {name:'Bus',field:'denuncia.placa'},
        {name:'Piloto',field:'chofer[0].dpi'},
        {name:'Tipo denuncia',field:'tipodenuncia[0].descripcion'}
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

  $scope.cerrar = function(){
    $cookies.remove('user');
    $location.url('/');
  };
});
