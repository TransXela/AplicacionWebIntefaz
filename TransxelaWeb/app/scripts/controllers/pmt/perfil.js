'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:PmtPerfilCtrl
 * @description
 * # PmtPerfilCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('PmtPerfilCtrl', function ($scope, apiService, $cookies, $location) {
    if(typeof $cookies.getObject('user') !== 'undefined' && $cookies.getObject('user')){
      $scope.idpmt = $cookies.getObject('user').id;
      $scope.token = $cookies.getObject('user').token;
      $scope.pmt = $cookies.getObject('user').usuario;
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
          $scope.alertas.push({"tipo":"success", "mensaje": "Contraseña cambiada exitosamente", "icono": "glyphicon glyphicon-ok"});
        }).
        error(function(response, status, headers, config) {
          switch(status) {
            case 400: {
              $scope.alertas.push({"tipo":"danger", "mensaje": "La contraseña actual no coincide", "icono": "glyphicon glyphicon-remove"});
              break;
            }
            case 403: {
              $scope.alertas.push({"tipo":"danger", "mensaje": "No tiene permisos para realizar esta acción", "icono": "glyphicon glyphicon-remove"});
              break;
            }
            case 404: {
              $scope.alertas.push({"tipo":"danger", "mensaje": "La contraseña actual no coincide", "icono": "glyphicon glyphicon-remove"});
              break;
            }
            default: {
              $location.url('/500');
            }
          }
        });
      }
      else {
        $scope.alertas.push({"tipo":"danger", "mensaje": "Las contraseñas no coinciden", "icono": "glyphicon glyphicon-remove"});
      }
    }
    $scope.cerrar = function(){
      $cookies.remove('user');
        $location.url('/');
    };
  });
