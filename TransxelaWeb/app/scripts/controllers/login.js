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
  $scope.alertas = [];
  if(typeof $cookies.getObject('user') !== 'undefined' && $cookies.getObject('user')){
    switch($cookies.getObject('user').tipo){
      case 'Dueños': {
        $location.url('/duenio/principal');
        break;
      }
      case 'PMT': {
        $location.url('/duenio/principal');
        break;
      }
      case 'Cultura': {
        $location.url('/duenio/principal');
        break;
      }
      case 'Admin': {
        $location.url('/duenio/principal');
        break;
      }
      default: {
        $cookies.remove('user');
      }
    }
  }

  $scope.iniciar = function(){
    apiService.crear('/obtenertoken/', {user: $scope.usuario, pass: $scope.contrasenia}).
    success(function(result, status, headers, config){
      var grupo = result.Grupo;
      if(grupo.name === "Dueños"){
        $cookies.putObject('user', {"token": result.Token, id: result.Duenio.idduenio, usuario: result.Duenio, tipo: grupo.name, torcido: result.Usuario});
        $location.url('/duenio/principal');
      }
      else if (grupo.name === "Cultura") {
        console.log({"token": result.Token, id: result.Cultura.idcultura, usuario: result.Cultura});
        $cookies.putObject('user', {"token": result.Token, id: result.Cultura.idcultura, usuario: result.Cultura, tipo: grupo.name, torcido: result.Usuario});
        $location.url('/cultura/principal');
      }
      else if (grupo.name === "PMT") {
        $cookies.putObject('user', {"token": result.Token, id: result.PMT.idpmt, usuario: result.PMT, tipo: grupo.name, torcido: result.Usuario});
        $location.url('/pmt/principal');
      }
      else if (grupo.name === "Admin") {
        $cookies.putObject('user', {"token": result.Token, id: result.Usuario.id, usuario: result.Usuario, tipo: grupo.name});
        $location.url('/admin/principal');
      }
      else {
        $location.url('/login');
      }
    }).
    error(function(response, status, headers, config) {
      switch(status) {
        case 400: {
          //$location.url('/404');
          $scope.alertas.push({"tipo": "danger", "mensaje": "Usuario y/o contraseña incorrecta"});
          break;
        }
        case 403: {
          $location.url('/403');
          break;
        }
        case 404: {
          //$location.url('/404');
          $scope.alertas.push({"tipo": "danger", "mensaje": "Usuario y/o contraseña incorrecta"});
          break;
        }
        default: {
          $location.url('/500');
        }
      }
    });
  };
});
