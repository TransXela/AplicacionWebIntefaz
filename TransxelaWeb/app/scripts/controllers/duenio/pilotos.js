'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPilotosCtrl
 * @description
 * # DuenioPilotosCtrl
 * Controller of the transxelaWebApp
 */

angular.module('transxelaWebApp').controller('DuenioPilotosCtrl', function($scope, $uibModal) {
  $scope.pilotos = [{
    "id": 1,
    "nombre": "Pablo",
    "apellidos": "Lopez",
    "direccion": "Ciudad",
    "dpi": 234817770,
    "telefono": 42606299,
    "correo": "panlopezv@gmail.com",
    "foto": "/pilotos/pablo-lopez.jpg",
    "estado": 1
  },
  {
    "id": 1,
    "nombre": "Andres",
    "apellidos": "Velasquez",
    "direccion": "Ciudad",
    "dpi": 234817770,
    "telefono": 42606299,
    "correo": "panlopezv@outlook.com",
    "foto": "/pilotos/andres-velasquez.jpg",
    "estado": 1
  }];
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
      console.log("entro");
      $scope.pilotos.push(result);
    }, function () {
     console.log('Modal dismissed at: ' + new Date());
    });
  };

  $scope.showVerModificar = function (index) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/duenio/piloto.html",
      controller: "VerModificarPController",
      resolve: {
        options: function () {
          return {"title": "Ver Piloto", "buttom": "Modificar"};
        },
        piloto: function(){
          return $scope.pilotos[index];
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.pilotos[index] = result;
    }, function () {
     console.log('Modal dismissed at: ' + new Date());
    });
  };

  $scope.gridOptions = {
    data: $scope.pilotos,
    enableFiltering: true,
    columnDefs:[
      {name:'Nombre',field:'nombre'},
      {name:'Apellidos',field:'apellidos'},
      {name:' ',cellTemplate:'<div><button ng-click="grid.appScope.showVerModificar(rowRenderIndex)">Ver detalles</button></div>', enableFiltering: false}
      ]
  };

});

angular.module('transxelaWebApp').controller('CrearPController', ['$scope', '$uibModalInstance', 'options', function ($scope, $uibModalInstance, options) {
  $scope.nombre = null;
  $scope.apellidos = null;
  $scope.direccion = null;
  $scope.nLicencia = null;
  $scope.tLicencia = null;
  $scope.telefono = null;
  $scope.correo = null;
  $scope.options = options;
  $scope.close = function () {
    $uibModalInstance.close({
      nombre: $scope.nombre,
      apellidos: $scope.apellidos,
      direccion: $scope.direccion,
      nLicencia: $scope.nLicencia,
      tLicencia: $scope.tLicencia,
      telefono: $scope.telefono,
      correo: $scope.correo
    }, 500);
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);

angular.module('transxelaWebApp').controller('VerModificarPController', ['$scope', '$uibModalInstance', 'options', 'piloto', function ($scope, $uibModalInstance, options, piloto) {
  $scope.nombre = piloto.nombre;
  $scope.apellidos = piloto.apellidos;
  $scope.direccion = piloto.direccion;
  $scope.nLicencia = piloto.nLicencia;
  $scope.tLicencia = piloto.tLicencia;
  $scope.telefono = piloto.telefono;
  $scope.correo = piloto.correo;
  $scope.options = options;
  $scope.close = function () {
    $uibModalInstance.close({
      nombre: $scope.nombre,
      apellidos: $scope.apellidos,
      direccion: $scope.direccion,
      nLicencia: $scope.nLicencia,
      tLicencia: $scope.tLicencia,
      telefono: $scope.telefono,
      correo: $scope.correo
    }, 500);
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);
