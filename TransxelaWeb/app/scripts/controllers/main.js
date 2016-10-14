'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('MainCtrl', function ($scope, $uibModal) {
  $scope.iniciarSesion = function (size) {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/login.html',
      controller: 'IniciarSesionController',
      size: size
    });

    uibModalInstance.result.then(function (result) {
      console.log(result);
    }, function () {
     console.log('Modal dismissed at: ' + new Date());
    });
  };
});

angular.module('transxelaWebApp').controller('IniciarSesionController', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
  $scope.usuario = null;
  $scope.contrasenia = null;
  $scope.close = function () {
    $uibModalInstance.close({
      usuario: $scope.usuario,
      contrasenia: $scope.contrasenia
    }, 500);
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);
// -------------PRINCIPAL-----------------------------------------------------------------------------------------------------------





// ---------END PRINCIPAL --------------------------------------------------------------------------------------------------
