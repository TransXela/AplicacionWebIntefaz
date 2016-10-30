'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPilotosCtrl
 * @description
 * # DuenioPilotosCtrl
 * Controller of the transxelaWebApp
 */

angular.module('transxelaWebApp').controller('DuenioPilotosCtrl', function($scope, apiService, $uibModal, $location, $cookies) {
  $scope.idduenio = $cookies.getObject('user').id;
  $scope.alertas = [];
  $scope.showCrear = function () {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/duenio/piloto.html',
      controller:'CrearPController',
      resolve: {
        options: function () {
          return {"title": "Crear Piloto", "buttom": "Crear"};
        },
        idduenio: function () {
          return $scope.idduenio;
        }
      }
    });
    uibModalInstance.result.then(function (result) {
      $scope.pilotos.push(result);
      $scope.alertas.push({"tipo":"success", "mensaje": "Piloto creado exitosamente"});
    }, function (status) {
      if(status === 'error'){
        $location.url('/404');
      }
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
      $scope.alertas.push({"tipo":"success", "mensaje": "Piloto modificado exitosamente"});
    }, function (status) {
      if(status === 'error'){
        $location.url('/404');
      }
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
  apiService.obtener('/duenio/'+$scope.idduenio+'/pilotos').
  success(function(response, status, headers, config){
    $scope.duenio = {"nombre":response.nombre, "apellidos": response.apellidos};
    $scope.pilotos = response.choferes;
    $scope.gridOptions.data = $scope.pilotos;
    $scope.gridOptions.enableFiltering = true;
    $scope.gridOptions.columnDefs = [
      {name:'Nombre',field:'nombre'},
      {name:'Apellidos',field:'apellidos'},
      {name:'Tipo Licencia',field:'tipolicencia'},
      {name:'Estado',field:'estado', cellTemplate: "<div>{{grid.appScope.mapearEstado(row.entity.estado)}}</div>", enableFiltering: false},
      {name:' ',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idchofer)">Ver detalles</button></div>', enableFiltering: false}
      ];
  }).
  error(function(response, status, headers, config) {
    if(status === null || status === -1){
      $location.url('/404');
    }
    else if(status === 401){
      $location.url('/403');
    }
  });
  $scope.mapearEstado = function(estado) {
    return estado ? 'Habilitado' : 'Deshabilitado';
  };

});

angular.module('transxelaWebApp').controller('CrearPController', ['$scope', 'apiService', '$uibModalInstance','options', 'idduenio', function ($scope, apiService, $uibModalInstance, options, idduenio) {
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
    apiService.crear('/duenio/piloto/', {
      nombre: $scope.nombre, apellidos: $scope.apellidos,
      dpi: String($scope.dpi), direccion: $scope.direccion,
      licencia: $scope.licencia, tipolicencia: $scope.tipolicencia,
      telefono: $scope.telefono, correo: $scope.correo,
      estado: parseInt($scope.estado), duenio: idduenio
    }).
    success(function(data, status, headers, config) {
      $uibModalInstance.close(data, 500);
    }).
    error(function(data, status, headers, config) {
      $uibModalInstance.dismiss('error');
    });
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);

angular.module('transxelaWebApp').controller('VerModificarPController', ['$scope', 'apiService', '$uibModalInstance', 'options', 'piloto', function ($scope, apiService, $uibModalInstance, options, piloto) {
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
    apiService.modificar('/duenio/piloto/' + piloto.idchofer, {
      nombre: $scope.nombre, apellidos: $scope.apellidos, dpi: String($scope.dpi),
      direccion: $scope.direccion, licencia: $scope.licencia, tipolicencia: $scope.tipolicencia,
      telefono: $scope.telefono, correo: $scope.correo,
      estado: parseInt($scope.estado), duenio: piloto.duenio
    }).
    success(function(response, status, headers, config){
      $uibModalInstance.close(response, 500);
    }).
    error(function(response, status, headers, config) {
      $uibModalInstance.dismiss('error');
      // if(status === null || status === -1){
      //   $location.url('/404');
      // }
      // else if(status === 401){
      //   $location.url('/403');
      // }
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
