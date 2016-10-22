'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPilotosCtrl
 * @description
 * # DuenioPilotosCtrl
 * Controller of the transxelaWebApp
 */

angular.module('transxelaWebApp').controller('DuenioPilotosCtrl', function($scope, $resource, $uibModal) {
  $scope.idduenio = 1;
  $scope.alertas = [];
  $scope.apiurl = 'http://127.0.0.1:8000';
  $scope.showCrear = function () {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/duenio/piloto.html',
      controller:'CrearPController',
      resolve: {
        options: function () {
          return {"title": "Crear Piloto", "buttom": "Crear", "apiurl": $scope.apiurl};
        },
        idduenio: function () {
          return $scope.idduenio;
        }
      }
    });
    uibModalInstance.result.then(function (result) {
      $scope.pilotos.push(result);
      $scope.alertas.push({"tipo":"success", "mensaje": "Piloto creado exitosamente"});
    }, function () {
    });
  };

  $scope.showVerModificar = function (idchofer) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/duenio/piloto.html",
      controller: "VerModificarPController",
      resolve: {
        options: function () {
          return {"title": "Ver Piloto", "buttom": "Modificar", "apiurl": $scope.apiurl};
        },
        piloto: function(){
          $scope.index = $scope.getIndexIfObjWithOwnAttr($scope.pilotos,"idchofer", idchofer);
          return $scope.pilotos[$scope.index];
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.pilotos[$scope.index] = result;
      $scope.alertas.push({"tipo":"success", "mensaje": "Piloto modificado exitosamente"});
    }, function () {
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

  $scope.gridOptions = {};
  var resource = $resource($scope.apiurl+'/duenio/'+$scope.idduenio+'/pilotos');
  var query = resource.get(function(){
    $scope.pilotos = query.choferes;
    $scope.gridOptions.data = $scope.pilotos;
    $scope.gridOptions.enableFiltering = true;
    $scope.gridOptions.columnDefs = [
      {name:'Nombre',field:'nombre'},
      {name:'Apellidos',field:'apellidos'},
      {name:'Tipo Licencia',field:'tipolicencia'},
      {name:'Estado',field:'estado', cellTemplate: "<div>{{grid.appScope.mapearEstado(row.entity.estado)}}</div>", enableFiltering: false},
      {name:' ',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idchofer)">Ver detalles</button></div>', enableFiltering: false}
      ];
  });
  $scope.mapearEstado = function(estado) {
            return estado ? 'Habilitado' : 'Deshabilitado';
  };

});

angular.module('transxelaWebApp').controller('CrearPController', ['$scope', '$http', '$uibModalInstance', 'options', 'idduenio', function ($scope, $http, $uibModalInstance, options, idduenio) {
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
    var res = $http.post(options.apiurl+'/duenio/piloto/', {
      nombre: $scope.nombre, apellidos: $scope.apellidos,
      dpi: String($scope.dpi), direccion: $scope.direccion,
      licencia: $scope.licencia, tipolicencia: $scope.tipolicencia,
      telefono: $scope.telefono, correo: $scope.correo,
      estado: parseInt($scope.estado), duenio: idduenio
    });
    res.success(function(data, status, headers, config) {
      $uibModalInstance.close(data, 500);
    });
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);

angular.module('transxelaWebApp').controller('VerModificarPController', ['$scope', '$resource', '$uibModalInstance', 'options', 'piloto', function ($scope, $resource, $uibModalInstance, options, piloto) {
  $scope.nombre = piloto.nombre;
  $scope.apellidos = piloto.apellidos;
  $scope.dpi = parseInt(piloto.dpi);
  $scope.direccion = piloto.direccion;
  $scope.licencia = piloto.licencia;
  $scope.tipolicencia = piloto.tipolicencia;
  $scope.telefono = piloto.telefono;
  $scope.correo = piloto.correo;
  $scope.estado = String(piloto.estado);
  $scope.options = options;
  $scope.close = function () {
    var resource = $resource(options.apiurl+'/duenio/piloto/' + piloto.idchofer, {}, {'update': {method:'PUT'}});
    resource.update({}, {
      nombre: $scope.nombre, apellidos: $scope.apellidos, dpi: String($scope.dpi),
      direccion: $scope.direccion, licencia: $scope.licencia, tipolicencia: $scope.tipolicencia,
      telefono: $scope.telefono, correo: $scope.correo,
      estado: parseInt($scope.estado), duenio: piloto.duenio
    }).$promise.then(function(data) {
      $uibModalInstance.close(data, 500);
    }, function(error) {
    });
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);
