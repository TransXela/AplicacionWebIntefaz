'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPilotosCtrl
 * @description
 * # DuenioPilotosCtrl
 * Controller of the transxelaWebApp
 */

angular.module('transxelaWebApp').controller('DuenioPilotosCtrl', function($scope, ModalService) {
  $scope.pilotos = [];
  $scope.piloto = {"nombre":"Pablo", "apellidos":"Lopez", "direccion": "0 Calle 0-97 Zona 10", 
  "nLicencia": 1234, "tLicencia": "B", "telefono": 12345678, "correo": "panlopezv@gmail.com"};
  $scope.showCrear = function() {
    ModalService.showModal({
      templateUrl: "views/duenio/piloto.html",
      controller: "CrearController",
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

  $scope.showVerModificar = function() {
    ModalService.showModal({
      templateUrl: "views/duenio/piloto.html",
      controller: "VerModificarController",
      inputs: {
        options: {"title": "Ver Piloto", "buttom": "Modificar"},
        piloto: $scope.piloto
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.pilotos.push(result);
      });
    });
  };

});

angular.module('transxelaWebApp').controller('CrearController', ['$scope', '$element', 'options', 'close', function($scope, $element, options, close) {
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
    close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
  };
}]);

angular.module('transxelaWebApp').controller('VerModificarController', ['$scope', '$element', 'options', 'piloto', 'close', function($scope, $element, options, piloto, close) {
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
    //  Now call close, returning control to the caller.
    close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
  };
}]);