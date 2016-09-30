'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioBusesCtrl
 * @description
 * # DuenioBusesCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioBusesCtrl', function ($scope, $uibModal, $log, $document) {
  var $ctrl = this;
  $ctrl.nuevoBus = {};
  $scope.buses = [];
  $scope.agregarBus = function(){
  	$scope.buses.push({"id":1,"placa":"c abc123"});
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
        nuevoBus: function () {
        	return $ctrl.nuevoBus;
        }
      }
    });

    modalInstance.result.then(function () {
      $scope.agregarBus();
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
        nuevoBus: function () {
        	return $ctrl.nuevoBus;
        }
      }
    });

    modalInstance.result.then(function () {
      $scope.agregarBus();
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