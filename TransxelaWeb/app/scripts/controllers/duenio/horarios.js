'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioHorariosCtrl
 * @description
 * # DuenioHorariosCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioHorariosCtrl', function($scope, ModalService) {
  $scope.horarios = [];
  $scope.horario = {"horainicio": new Date(), "horafin": new Date()};
  $scope.showCrear = function() {
    ModalService.showModal({
      templateUrl: "views/duenio/horario.html",
      controller: "CrearHController",
      inputs: {
        options: {"title": "Crear Horario", "buttom": "Crear"}
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.horarios.push(result);
      });
    });
  };

  $scope.showVerModificar = function() {
    ModalService.showModal({
      templateUrl: "views/duenio/horario.html",
      controller: "VerModificarHController",
      inputs: {
        options: {"title": "Ver Horario", "buttom": "Modificar"},
        horario: $scope.horario
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {

      });
    });
  };

});

angular.module('transxelaWebApp').controller('CrearHController', ['$scope', '$element', 'options', 'close', function($scope, $element, options, close) {
  $scope.horainicio = new Date();
  $scope.horafin = new Date();
  $scope.options = options;
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
    close({
      horainicio: $scope.horainicio,
      horafin: $scope.horafin
    }, 500); // close, but give 500ms for bootstrap to animate
  };
  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {
    //  Manually hide the modal.
    $element.modal('hide');
    //  Now call close, returning control to the caller.
    close({
      horainicio: $scope.horainicio,
      horafin: $scope.horafin
    }, 500); // close, but give 500ms for bootstrap to animate
  };
}]);

angular.module('transxelaWebApp').controller('VerModificarHController', ['$scope', '$element', 'options', 'horario', 'close', function($scope, $element, options, horario, close) {
  $scope.horainicio = horario.horainicio;
  $scope.horafin = horario.horafin;
  $scope.options = options;
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
    close({
      horainicio: $scope.horainicio,
      horafin: $scope.horafin
    }, 500); // close, but give 500ms for bootstrap to animate
  };
  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {
    //  Manually hide the modal.
    $element.modal('hide');
    //  Now call close, returning control to the caller.
    close({
      horainicio: $scope.horainicio,
      horafin: $scope.horafin
    }, 500); // close, but give 500ms for bootstrap to animate
  };
}]);