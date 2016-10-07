'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPilotosCtrl
 * @description
 * # DuenioPilotosCtrl
 * Controller of the transxelaWebApp
 */
 angular.module('transxelaWebApp').controller('DuenioPilotosCtrl', ['$scope','$uibModal',function ($scope, $uibModal) {
  $scope.usuario = {};
  $scope.nuevoPiloto = {};
  $scope.piloto = {"nombre": "Pablo",
  "apellidos": "Lopez",
  "direccion": "Ciudad",
  "dpi": 234817770,
  "telefono": 42606299,
  "correo": "panlopezv@gmail.com",
  "foto": "/duenios/pablo-lopez.jpg",
  "estado": 1};
  $scope.pilotos = [];

  $scope.openCrear = function (size) {
    var uibModalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/duenio/crearPiloto.html',
      controller:'CrearCtrl',
      size: size
    });
  };

  $scope.openVerModificar = function (size) {
    var uibModalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/duenio/verModificarPiloto.html',
      controller:'VerModificarCtrl',
      size: size,
      resolve: {
        piloto: function () {
          return $scope.piloto;
        }
      }
    });
  };
}]);

angular.module('transxelaWebApp').controller('CrearCtrl', function ($scope, $uibModalInstance) {
  $scope.crear = function () {
    $uibModalInstance.close();
  };

  $scope.cancelar = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('transxelaWebApp').controller('VerModificarCtrl', ['$scope','$uibModalInstance','piloto', function ($scope, $uibModalInstance, piloto) {
  $scope.piloto = piloto;
  $scope.modificar = function () {
    $uibModalInstance.close();
  };

  $scope.cancelar = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);