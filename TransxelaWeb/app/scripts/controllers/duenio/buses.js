'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioBusesCtrl
 * @description
 * # DuenioBusesCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioBusesCtrl', function($scope, $uibModal) {
  $scope.buses = [{"marca": "Toyota", "modelo": "Hiace", "placa": "C 123ABC", "numero": 1, "color": "rojo", "observaciones": "No tiene puerta lateral."}];
  $scope.showCrear = function () {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/duenio/bus.html',
      controller:'CrearBController',
      resolve: {
        options: function () {
          return {"title": "Crear Bus", "buttom": "Crear"};
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.buses.push(result);
    }, function () {
     console.log('Modal dismissed at: ' + new Date());
    });
  };

  $scope.showVerModificar = function (index) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/duenio/bus.html",
      controller: "VerModificarBController",
      resolve: {
        options: function () {
          return {"title": "Ver Bus", "buttom": "Modificar"};
        },
        bus: function(){
          return $scope.buses[index];
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.buses[index] = result;
    }, function () {
     console.log('Modal dismissed at: ' + new Date());
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

angular.module('transxelaWebApp').controller('CrearBController', ['$scope', '$uibModalInstance', 'options', function ($scope, $uibModalInstance, options) {
  $scope.marca = null;
  $scope.modelo = null;
  $scope.placa = null;
  $scope.numero = null;
  $scope.color = null;
  $scope.observaciones = null;
  $scope.options = options;
  $scope.close = function () {
    $uibModalInstance.close({
    marca: $scope.marca,
    modelo: $scope.modelo,
    placa: $scope.placa,
    numero: $scope.numero,
    color: $scope.color,
    observaciones: $scope.observaciones
    }, 500);
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);

angular.module('transxelaWebApp').controller('VerModificarBController', ['$scope', '$uibModalInstance', 'options', 'bus', function ($scope, $uibModalInstance, options, bus) {
  $scope.marca = bus.marca;
  $scope.modelo = bus.modelo; 
  $scope.placa = bus.placa; 
  $scope.numero = bus.numero; 
  $scope.color = bus.color; 
  $scope.observaciones = bus.observaciones;
  $scope.options = options;
  $scope.close = function () {
    $uibModalInstance.close({
    marca: $scope.marca,
    modelo: $scope.modelo,
    placa: $scope.placa,
    numero: $scope.numero,
    color: $scope.color,
    observaciones: $scope.observaciones
    }, 500);
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);