'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPilotosCtrl
 * @description
 * # DuenioPilotosCtrl
 * Controller of the transxelaWebApp
 */

angular.module('transxelaWebApp').controller('DuenioPilotosCtrl', function($scope, $uibModal) {
  $scope.pilotos = [];
  $scope.showCrear = function () {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/duenio/piloto.html',
      controller:'CrearPController',
      resolve: {
        options: function () {
          return {"title": "Crear Piloto", "buttom": "Crear"};
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.pilotos.push(result);
      console.log($scope.pilotos);
    }, function () {
     console.log('Modal dismissed at: ' + new Date());
    });
  };

  $scope.showVerModificar = function (idchofer) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/duenio/piloto.html",
      controller: "VerModificarPController",
      resolve: {
        options: function () {
          return {"title": "Ver Piloto", "buttom": "Modificar"};
        },
        piloto: function(){
          $scope.index = $scope.getIndexIfObjWithOwnAttr($scope.pilotos,"idchofer", idchofer);
          return $scope.pilotos[$scope.index];
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.pilotos[$scope.index] = result;
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
    data: $scope.pilotos,
    enableFiltering: true,
    columnDefs:[
      {name:'Nombre',field:'nombre'},
      {name:'Apellidos',field:'apellidos'},
      {name:'Tipo Licencia',field:'tipolicencia'},
      {name:'Estado',field:'estado'},
      {name:' ',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idchofer)">Ver detalles</button></div>', enableFiltering: false}
      ]
  };

});

angular.module('transxelaWebApp').controller('CrearPController', ['$scope', '$uibModalInstance', 'options', function ($scope, $uibModalInstance, options) {
  $scope.nombre = null;
  $scope.apellidos = null; 
  $scope.dpi = null; 
  $scope.direccion = null; 
  $scope.licencia = null; 
  $scope.tipolicencia = null; 
  $scope.telefono = null;
  $scope.correo = null;
  $scope.estado = "1";
  $scope.options = options;
  $scope.close = function () {
    $uibModalInstance.close({
      nombre: $scope.nombre,
      apellidos: $scope.apellidos,
      dpi: $scope.dpi,
      direccion: $scope.direccion,
      licencia: $scope.licencia,
      tipolicencia: $scope.tipolicencia,
      telefono: $scope.telefono,
      correo: $scope.correo,
      estado: parseInt($scope.estado)
    }, 500);
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);

angular.module('transxelaWebApp').controller('VerModificarPController', ['$scope', '$uibModalInstance', 'options', 'piloto', function ($scope, $uibModalInstance, options, piloto) {
  $scope.nombre = piloto.nombre;
  $scope.apellidos = piloto.apellidos; 
  $scope.dpi = piloto.dpi; 
  $scope.direccion = piloto.direccion; 
  $scope.licencia = piloto.licencia; 
  $scope.tipolicencia = piloto.tipolicencia; 
  $scope.telefono = piloto.telefono;
  $scope.correo = piloto.correo;
  $scope.estado = String(piloto.estado);
  $scope.options = options;
  $scope.close = function () {
    $uibModalInstance.close({
      nombre: $scope.nombre,
      apellidos: $scope.apellidos,
      dpi: $scope.dpi,
      direccion: $scope.direccion,
      licencia: $scope.licencia,
      tipolicencia: $scope.tipolicencia,
      telefono: $scope.telefono,
      correo: $scope.correo,
      estado: parseInt($scope.estado)
    }, 500);
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);