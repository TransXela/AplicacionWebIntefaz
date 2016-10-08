'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioHorariosCtrl
 * @description
 * # DuenioHorariosCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioHorariosCtrl', function ($scope, $uibModal, $log, $document) {
  var $ctrl = this;
  $ctrl.hInicio = new Date();
  $ctrl.histep = 7;
  $ctrl.mistep = 30;
  $ctrl.hFin = new Date();
  $ctrl.hfstep = 8;
  $ctrl.mfstep = 30;


  $ctrl.nuevoHorario = {};
  $scope.horarios = [];
  $scope.agregarHorario = function(){
  	$scope.horarios.push({"idDuenio":1,"hInicio":"7:00","hFin":"8:30"});
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
        nuevoHorario: function () {
        	return $ctrl.nuevoHorario;
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
        nuevoHorario: function () {
        	return $ctrl.nuevoHorario;
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