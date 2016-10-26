'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:PmtRutasCtrl
 * @description
 * # PmtRutasCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('PmtRutasCtrl', function ($scope) {
    $scope.alertas = [];
    $scope.apiurl = 'http://127.0.0.1:8000';
    $scope.showRutas = function () {
      var uibModalInstance = $uibModal.open({
        templateUrl: 'views/pmt/agregarRuta.html',
        controller:'CrearRController',
        resolve: {
          options: function () {
            return {"apiurl": $scope.apiurl};
          }
        }
      });
  }});
