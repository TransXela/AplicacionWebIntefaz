'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPilotosCtrl
 * @description
 * # DuenioPilotosCtrl
 * Controller of the transxelaWebApp
 */

angular.module('transxelaWebApp').controller('DuenioPilotosCtrl', function($scope, ModalService) {
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
  $scope.showCrear = function() {
    ModalService.showModal({
      templateUrl: "views/duenio/piloto.html",
      controller: "CrearPController",
      inputs: {
        options: {"title": "Crear Piloto", "buttom": "Crear"}
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.pilotos.push(result);
      });
    });
  };

  $scope.showVerModificar = function(index) {
    ModalService.showModal({
      templateUrl: "views/duenio/piloto.html",
      controller: "VerModificarPController",
      inputs: {
        options: {"title": "Ver Piloto", "buttom": "Modificar"},
        piloto: $scope.pilotos[index]
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.pilotos[index] = result;
      });
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

angular.module('transxelaWebApp').controller('CrearPController', ['$scope', '$element', 'options', 'close', function($scope, $element, options, close) {
  $scope.nombre = null;
  $scope.apellidos = null; 
  $scope.direccion = null; 
  $scope.nLicencia = null; 
  $scope.tLicencia = null; 
  $scope.telefono = null;
  $scope.correo = null;
  $scope.options = options;
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
    close({
      nombre: $scope.nombre,
      apellidos: $scope.apellidos,
      direccion: $scope.direccion,
      nLicencia: $scope.nLicencia,
      tLicencia: $scope.tLicencia,
      telefono: $scope.telefono,
      correo: $scope.correo
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

angular.module('transxelaWebApp').controller('VerModificarPController', ['$scope', '$element', 'options', 'piloto', 'close', function($scope, $element, options, piloto, close) {
  $scope.nombre = piloto.nombre;
  $scope.apellidos = piloto.apellidos; 
  $scope.direccion = piloto.direccion; 
  $scope.nLicencia = piloto.nLicencia; 
  $scope.tLicencia = piloto.tLicencia; 
  $scope.telefono = piloto.telefono;
  $scope.correo = piloto.correo;
  $scope.options = options;
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
    close({
      nombre: $scope.nombre,
      apellidos: $scope.apellidos,
      direccion: $scope.direccion,
      nLicencia: $scope.nLicencia,
      tLicencia: $scope.tLicencia,
      telefono: $scope.telefono,
      correo: $scope.correo
    }, 500); // close, but give 500ms for bootstrap to animate
  };
  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {
    //  Manually hide the modal.
    $element.modal('hide');
  };
}]);