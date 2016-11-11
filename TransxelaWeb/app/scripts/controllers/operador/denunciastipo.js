'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:OperadorDenunciastipoCtrl
 * @description
 * # OperadorDenunciastipoCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('OperadorDenunciastipoCtrl', function ($scope, apiService, $cookies, $location) {
    if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
      $scope.token = $cookies.getObject('user').token;
      $scope.usuario = $cookies.getObject('user').usuario;
      $scope.idbus = $cookies.get('idbus');
      $scope.idtipo = $cookies.get('idtipo');
      $scope.gridOptions = {};
      apiService.obtener('/denuncias/ruta/bus/'+$scope.idbus+'/'+$scope.idtipo+'/'+$scope.token).
      success(function(response, status, headers, config) {
        $scope.denuncias = response[1].denuncias;
          $scope.bus = {"placa": $scope.denuncias[0].placa};
        $scope.tipodenuncia = response[0].tipodenuncia[0];
        $scope.gridOptions.data = $scope.denuncias;
        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.columnDefs = [
          {name:'Fecha',field:'fechahora', cellFilter: 'date:\'hh:mm a dd-MM-yy\''},
          {name:'Bus',field:'placa'},
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
      $cookies.remove('idruta');
      $cookies.remove('idbus');
      $cookies.remove('idtipo');
      $location.url('/');
    };
  });
