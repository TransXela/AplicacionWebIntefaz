'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPerfilCtrl
 * @description
 * # DuenioPerfilCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioPerfilCtrl', function ($scope, apiService, $cookies, $location) {
    if(typeof $cookies.getObject('user') !== 'undefined' && $cookies.getObject('user')){
      $scope.idduenio = $cookies.getObject('user').id;
      $scope.token = $cookies.getObject('user').token;
      apiService.obtener('/duenio/'+$scope.idduenio + '/?tk=' + $scope.token).
      success(function(response, status, headers, config) {
        $scope.duenio = response;
      }).
      error(function(response, status, headers, config) {
        switch(status) {
          case 400: {
            $location.url('/404');
            break;
          }
          case 403: {
            $location.url('/403');
            break;
          }
          case 404: {
            $location.url('/404');
            break;
          }
          default: {
            $location.url('/500');
          }
        }
      });
    }
    else{
      $location.url('/login');
    }
    $scope.cAnterior = null;
    $scope.cNueva = null;
    $scope.cRepetir = null;
    $scope.alertas = [];
    $scope.cambiarContrasenia = function(){
      if($scope.cNueva === $scope.cRepetir) {
        apiService.modificar('/users/cambiarcontreniausuario/'+ $cookies.getObject('user').torcido + '/?tk=' + $scope.token, {
          'password_old': $scope.cAnterior, 'password_new': $scope.cNueva
        }).
        success(function(response, status, headers, config){
          $scope.alertas.push({"tipo":"success", "mensaje": "Contraseña cambiada exitosamente"});
        }).
        error(function(response, status, headers, config) {
          switch(status) {
            case 400: {
              $scope.alertas.push({"tipo":"danger", "mensaje": "La contraseña anterior no coincide"});
              break;
            }
            case 403: {
              $scope.alertas.push({"tipo":"danger", "mensaje": "No tiene permisos para realizar esta acción"});
              break;
            }
            case 404: {
              $scope.alertas.push({"tipo":"danger", "mensaje": "La contraseña anterior no coincide"});
              break;
            }
            default: {
              $location.url('/500');
            }
          }
        });
      }
      else {
        $scope.alertas.push({"tipo":"danger", "mensaje": "Las contraseñas no coinciden"});
      }
    }
    $scope.cerrar = function(){
      $cookies.remove('user');
        $location.url('/');
    };
});
