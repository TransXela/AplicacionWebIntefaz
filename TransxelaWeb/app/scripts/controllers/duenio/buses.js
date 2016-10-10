'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioBusesCtrl
 * @description
 * # DuenioBusesCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioBusesCtrl', function($scope, ModalService) {
  $scope.buses = [{"marca": "Toyota", "modelo": "Hiace", "placa": "C 123ABC", "numero": 1, "color": "rojo", "observaciones": "No tiene puerta lateral."}];
  $scope.showCrear = function() {
    ModalService.showModal({
      templateUrl: "views/duenio/bus.html",
      controller: "CrearBController",
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

  $scope.showVerModificar = function(index) {
    ModalService.showModal({
      templateUrl: "views/duenio/bus.html",
      controller: "VerModificarBController",
      inputs: {
        options: {"title": "Ver Bus", "buttom": "Modificar"},
        bus: $scope.buses[index]
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.buses[index] = result;
      });
    });
  };

  $scope.gridOptions = {
    data: $scope.buses,
    enableFiltering: true,
    columnDefs:[
      {name:'Placa',field:'placa'},
      {name:'Marca',field:'marca'},
      {name:'Modelo',field:'modelo'},
      {name:' ',cellTemplate:'<div><button ng-click="grid.appScope.showVerModificar(rowRenderIndex)">Ver detalles</button></div>', enableFiltering: false}
      ]
  };
});

angular.module('transxelaWebApp').controller('CrearBController', ['$scope', '$element', 'options', 'close', function($scope, $element, options, close) {
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
    //  Now call close, returning control to the caller
  };
}]);

angular.module('transxelaWebApp').controller('VerModificarBController', ['$scope', '$element', 'options', 'bus', 'close', function($scope, $element, options, bus, close) {
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
    //  Now call close, returning control to the caller
  };
}]);