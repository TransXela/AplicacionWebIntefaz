'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioBusesCtrl
 * @description
 * # DuenioBusesCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioBusesCtrl', ['$scope','$uibModal',function ($scope, $uibModal) {
  $scope.openCrear = function (size) {
    var uibModalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/duenio/crearBus.html',
      controller:'CrearCtrl',
      size: size
    });
  };

  $scope.openVerModificar = function (size) {
    var uibModalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/duenio/verModificarBus.html',
      controller:'VerModificarCtrl',
      size: size
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

angular.module('transxelaWebApp').controller('VerModificarCtrl', function ($scope, $uibModalInstance) {
  $scope.modificar = function () {
    $uibModalInstance.close();
  };

  $scope.cancelar = function () {
    $uibModalInstance.dismiss('cancel');
  };
});