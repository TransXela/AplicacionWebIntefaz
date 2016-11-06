'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:LogInCtrl
 * @description
 * # LogInCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('LogInCtrl', function ($scope, $location, apiService, $cookies) {
  $scope.usuario = null;
  $scope.contrasenia = null;
  $scope.iniciar = function(){
    apiService.crear('/obtenertoken/', {user: $scope.usuario, pass: $scope.contrasenia}).
    success(function(result, status, headers, config){
      var grupo = result.Grupo;
      if(grupo.name === "Dueños"){
        $cookies.putObject('user', {"token": result.Token, id: result.Duenio.idduenio, usuario: result.Duenio});
        $location.url('/duenio/principal');
      }
      else if (grupo.name === "Cultura") {
        console.log({"token": result.Token, id: result.Cultura.idcultura, usuario: result.Cultura});
        $cookies.putObject('user', {"token": result.Token, id: result.Cultura.idcultura, usuario: result.Cultura});
        $location.url('/cultura/principal');
      }
      else if (grupo.name === "PMT") {
        $cookies.putObject('user', {"token": result.Token, id: result.PMT.idpmt, usuario: result.PMT});
        $location.url('/pmt/principal');
      }
      else if (grupo.name === "Admin") {
        $cookies.putObject('user', {"token": result.Token, usuario: result.Usuario});
        $location.url('/admin/principal');
      }
      else {
        $location.url('/login');
      }
    }).
    error(function(response, status, headers, config) {
      $cookies.remove('user');
      $location.url('/login');
    });
  };
});
