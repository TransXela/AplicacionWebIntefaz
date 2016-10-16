'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioBusesCtrl
 * @description
 * # DuenioBusesCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioBusesCtrl', function($scope, $uibModal) {
  $scope.buses = [{"idbus": 5,"marca": "Toyota", "modelo": "Hiace", "placa": "C 123ABC", "numbus": 1, "color": "rojo", "ruta": 1, "observaciones": "No tiene puerta lateral.", "estado": 1}];
  $scope.rutas = [{"ruta": 2, "nombre": "Florida"}, {"ruta": 1, "nombre": "Queztali"}];
  $scope.showCrear = function () {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/duenio/bus.html',
      controller:'CrearBController',
      resolve: {
        options: function () {
          return {"title": "Crear Bus", "buttom": "Crear"};
        },
        rutas: function() {
          return $scope.rutas;
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.buses.push(result);
    }, function () {
     console.log('Modal dismissed at: ' + new Date());
    });
  };

  $scope.showVerModificar = function (idbus) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/duenio/bus.html",
      controller: "VerModificarBController",
      resolve: {
        options: function () {
          return {"title": "Ver Bus", "buttom": "Modificar"};
        },
        bus: function(){
          $scope.index = $scope.getIndexIfObjWithOwnAttr($scope.buses,"idbus", idbus);
          return $scope.buses[$scope.index];
        },
        rutas: function() {
          return $scope.rutas;
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.buses[$scope.index] = result;
    }, function () {
     console.log('Modal dismissed at: ' + new Date());
    });
  };

  $scope.getIndexIfObjWithOwnAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  };

  $scope.gridOptions = {
    data: $scope.buses,
    enableFiltering: true,
    columnDefs:[
      {name:'Placa',field:'placa'},
      {name:'Marca',field:'marca'},
      {name:'Modelo',field:'modelo'},
      {name:'Estado', field: 'estado'},
      {name:' ',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idbus)">Ver detalles</button></div>', enableFiltering: false}
      ]
  };
});

angular.module('transxelaWebApp').controller('CrearBController', ['$scope', '$uibModalInstance', 'options', 'rutas', function ($scope, $uibModalInstance, options, rutas) {
  $scope.marca = null;
  $scope.modelo = null;
  $scope.placa = null;
  $scope.numbus = null;
  $scope.color = null;
  $scope.ruta = null;
  $scope.observaciones = null;
  $scope.estado = "1";
  $scope.rutas = rutas;
  $scope.options = options;
  $scope.close = function () {
    $uibModalInstance.close({
    marca: $scope.marca,
    modelo: $scope.modelo,
    placa: $scope.placa,
    numbus: $scope.numbus,
    color: $scope.color,
    ruta: parseInt($scope.ruta),
    observaciones: $scope.observaciones,
    estado: parseInt($scope.estado)
    }, 500);
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);

angular.module('transxelaWebApp').controller('VerModificarBController', ['$scope', '$uibModalInstance', 'options', 'bus', 'rutas', function ($scope, $uibModalInstance, options, bus, rutas) {
  $scope.marca = bus.marca;
  $scope.modelo = bus.modelo; 
  $scope.placa = bus.placa; 
  $scope.numbus = bus.numbus; 
  $scope.color = bus.color;
  $scope.ruta = String(bus.ruta); 
  $scope.observaciones = bus.observaciones;
  $scope.estado = String(bus.estado);
  $scope.rutas = rutas;
  $scope.options = options;
  $scope.close = function () {
    $uibModalInstance.close({
    marca: $scope.marca,
    modelo: $scope.modelo,
    placa: $scope.placa,
    numbus: $scope.numbus,
    color: $scope.color,
    ruta: parseInt($scope.ruta),
    observaciones: $scope.observaciones,
    estado: parseInt($scope.estado)
    }, 500);
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);