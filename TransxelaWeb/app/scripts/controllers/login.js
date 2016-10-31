'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:LogInCtrl
 * @description
 * # LogInCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('LogInCtrl', function ($scope, $location) {
  $scope.usuario = null;
  $scope.contrasenia = null;
  $scope.iniciar = function(){
    // $location.url('/duenio/principal');
    // $location.url('/pmt/principal');
    // $location.url('/cultura/principalcultura');
    // $location.url('/admin/principal');
  };
});
