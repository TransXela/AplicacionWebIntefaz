'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioBusesCtrl
 * @description
 * # DuenioBusesCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioBusesCtrl', function($scope, ModalService) {
  $scope.buses = [];
  $scope.bus = {"marca": "Toyota", "modelo": "Hiace", "placa": "C 123ABC", "numero": 1, "color": "rojo", "observaciones": "No tiene puerta lateral."};
  $scope.showCrear = function() {
    ModalService.showModal({
      templateUrl: "views/duenio/bus.html",
      controller: "CrearController",
      inputs: {
        options: {"title": "Crear Bus", "buttom": "Crear"}
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.buses.push(result);
      });
    });
  };

  $scope.showVerModificar = function() {
    ModalService.showModal({
      templateUrl: "views/duenio/bus.html",
      controller: "VerModificarController",
      inputs: {
        options: {"title": "Ver Bus", "buttom": "Modificar"},
        bus: $scope.bus
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {

      });
    });
  };

});

angular.module('transxelaWebApp').controller('CrearController', ['$scope', '$element', 'options', 'close', function($scope, $element, options, close) {
  $scope.marca = null;
  $scope.modelo = null;
  $scope.placa = null;
  $scope.numero = null;
  $scope.color = null;
  $scope.observaciones = null;
  $scope.options = options;
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
    close({
      marca: $scope.marca,
      modelo: $scope.modelo,
      placa: $scope.placa,
      numero: $scope.numero,
      color: $scope.color,
      observaciones: $scope.observaciones
    }, 500); // close, but give 500ms for bootstrap to animate
  };
  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {
    //  Manually hide the modal.
    $element.modal('hide');
    //  Now call close, returning control to the caller.
    close({
      marca: $scope.marca,
      modelo: $scope.modelo,
      placa: $scope.placa,
      numero: $scope.numero,
      color: $scope.color,
      observaciones: $scope.observaciones
    }, 500); // close, but give 500ms for bootstrap to animate
  };
}]);

angular.module('transxelaWebApp').controller('VerModificarController', ['$scope', '$element', 'options', 'bus', 'close', function($scope, $element, options, bus, close) {
  $scope.marca = bus.marca;
  $scope.modelo = bus.modelo; 
  $scope.placa = bus.placa; 
  $scope.numero = bus.numero; 
  $scope.color = bus.color; 
  $scope.observaciones = bus.observaciones;
  $scope.options = options;
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
    close({
      marca: $scope.marca,
      modelo: $scope.modelo,
      placa: $scope.placa,
      numero: $scope.numero,
      color: $scope.color,
      observaciones: $scope.observaciones
    }, 500); // close, but give 500ms for bootstrap to animate
  };
  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {
    //  Manually hide the modal.
    $element.modal('hide');
    //  Now call close, returning control to the caller.
    close({
      marca: $scope.marca,
      modelo: $scope.modelo,
      placa: $scope.placa,
      numero: $scope.numero,
      color: $scope.color,
      observaciones: $scope.observaciones
    }, 500); // close, but give 500ms for bootstrap to animate
  };
}]);