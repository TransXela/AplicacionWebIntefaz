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
        $location.url('/pmt/principal');
        break;
      }
      case 'Cultura': {
        $location.url('/cultura/principal');
        break;
      }
      case 'Admin': {
        $location.url('/admin/principal');
        break;
      }
      default: {
        $cookies.remove('user');
        $location.url('/login');
      }
    }
  }
  else{
    $scope.alertas.push({"tipo": "danger", "mensaje": "Sesión expirada. Por favor inicie sesión de nuevo para acceder.", "icono": "glyphicon glyphicon-remove"});
  }
  $scope.iniciar = function(){
    apiService.crear('/obtenertoken/', {user: $scope.usuario, pass: $scope.contrasenia}).
    success(function(result, status, headers, config){
      var grupo = result.Grupo;
      if(grupo.name === "Dueños"){
        $cookies.putObject('user', {"token": result.Token, id: result.Duenio.idduenio, usuario: result.Duenio, tipo: grupo.name, torcido: result.Usuario.id});
        $location.url('/duenio/principal');
      }
      else if (grupo.name === "Cultura") {
        $cookies.putObject('user', {"token": result.Token, id: result.Cultura.idcultura, usuario: result.Cultura, tipo: grupo.name, torcido: result.Usuario.id});
        $location.url('/cultura/principal');
      }
      else if (grupo.name === "PMT") {
        $cookies.putObject('user', {"token": result.Token, id: result.PMT.idpmt, usuario: result.PMT, tipo: grupo.name, torcido: result.Usuario.id});
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
      $scope.alertas = [];
      switch(status) {
        case 400: {
          //$location.url('/404');
          $scope.alertas.push({"tipo": "danger", "mensaje": "Usuario y/o contraseña incorrecta", "icono": "glyphicon glyphicon-remove"});
          break;
        }
        case 403: {
          $location.url('/403');
          break;
        }
        case 404: {
          //$location.url('/404');
          $scope.alertas.push({"tipo": "danger", "mensaje": "Usuario y/o contraseña incorrecta", "icono": "glyphicon glyphicon-remove"});
          break;
        }
        default: {
          $location.url('/500');
        }
      }
    });
  };
});
