'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:OperadorDenunciastipoCtrl
 * @description
 * # OperadorDenunciastipoCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('OperadorDenunciastipoCtrl', function ($scope, apiService, denunciaService, $cookies, $location) {
    if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
      $scope.token = $cookies.getObject('user').token;
      $scope.usuario = $cookies.getObject('user').usuario;
      $scope.idbus = denunciaService.getBus();
      $scope.idtipo = denunciaService.getTipo();
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
        denunciaService.setRuta($scope.idruta);
        denunciaService.setBus($scope.bus.idbus);
        denunciaService.setTipo($scope.idtipo);
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
