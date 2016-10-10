'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioHorariosCtrl
 * @description
 * # DuenioHorariosCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioHorariosCtrl', function($scope, ModalService) {
  $scope.horarios = [{"horainicio": new Date("October 09, 2016 10:00:00"), "horafin": new Date("October 09, 2016 11:30:00")}];
  $scope.showCrear = function() {
    ModalService.showModal({
      templateUrl: "views/duenio/horario.html",
      controller: "CrearHController",
      inputs: {
        options: {"title": "Crear Horario", "button": "Crear"}
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.horarios.push(result);
      });
    });
  };

  $scope.showVerModificar = function(index) {
    ModalService.showModal({
      templateUrl: "views/duenio/horario.html",
      controller: "VerModificarHController",
      inputs: {
        options: {"title": "Ver Horario", "button": "Modificar"},
        horario: $scope.horarios[index]
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.horarios[index] = result;
      });
    });
  };
  $scope.gridOptions = {
    data: $scope.horarios,
    columnDefs:[
      {name:'Hora inicio',field:'horainicio', cellFilter: 'date:\'hh:mm a\''},
      {name:'Hora fin',field:'horafin', cellFilter: 'date:\'hh:mm a\''},
      {name:' ',cellTemplate:'<div><button ng-click="grid.appScope.showVerModificar(rowRenderIndex)">Ver detalles</button></div>'}
      ]
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
  };
}]);