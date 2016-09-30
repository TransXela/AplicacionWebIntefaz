'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPilotosCtrl
 * @description
 * # DuenioPilotosCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioPilotosCtrl', function ($scope, $uibModal, $log, $document) {
  var $ctrl = this;
  $ctrl.nuevoPiloto = {};
  $scope.pilotos = [];
  $scope.agregarPiloto = function(){
  	$scope.pilotos.push({"id":1,"nombre":"Pablo","apellidos":"Lopez"});
  };
  $ctrl.openCrear = function (size, parentSelector) {
  	var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'ModalCrear.html',
      controller: 'ModalCrearCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        nuevoPiloto: function () {
        	return $ctrl.nuevoPiloto;
        }
      }
    });

    modalInstance.result.then(function () {
      $scope.agregarPiloto();
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

  };

  $ctrl.openVerModificar = function (size, parentSelector) {
  	var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'ModalVerModificar.html',
      controller: 'ModalVerModificarCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        nuevoPiloto: function () {
        	return $ctrl.nuevoPiloto;
        }
      }
    });

    modalInstance.result.then(function () {
      $scope.agregarPiloto();
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

  };

});

angular.module('transxelaWebApp').controller('ModalCrearCtrl', function ($uibModalInstance) {
  var $ctrl = this;

  $ctrl.crear = function () {
    $uibModalInstance.close();
  };

  $ctrl.cancelar = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('transxelaWebApp').controller('ModalVerModificarCtrl', function ($uibModalInstance) {
  var $ctrl = this;

  $ctrl.modificar = function () {
    $uibModalInstance.close();
  };

  $ctrl.cancelar = function () {
    $uibModalInstance.dismiss('cancel');
  };
});