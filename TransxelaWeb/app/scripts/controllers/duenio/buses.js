'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioBusesCtrl
 * @description
 * # DuenioBusesCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioBusesCtrl', function($scope, apiService, $uibModal,  $location, $cookies) {
  $scope.alertas = [];
  $scope.showCrear = function () {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/duenio/bus.html',
      controller:'CrearBController',
      resolve: {
        options: function () {
          return {"title": "Crear Bus", "buttom": "Crear", "token": $scope.token};
        },
        rutas: function() {
          return $scope.rutas;
        },
        idduenio: function () {
          return $scope.idduenio;
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.buses.push(result);
      $scope.alertas.push({"tipo":"success", "mensaje": "Bus creado exitosamente"});
    }, function (status) {
      if(status === 'error'){
        $location.url('/404');
      }
    });
  };

  $scope.showVerModificar = function (idbus) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/duenio/bus.html",
      controller: "VerModificarBController",
      resolve: {
        options: function () {
          return {"title": "Ver Bus", "buttom": "Modificar", "token": $scope.token};
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
      $scope.alertas.push({"tipo":"success", "mensaje": "Bus modificado exitosamente"});
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

  $scope.mapearEstado = function(estado) {
            return estado ? 'Habilitado' : 'Deshabilitado';
  };

  $scope.mapearRuta = function(idruta) {
    for(var i = 0; i < $scope.rutas.length; i++) {
      if($scope.rutas[i]["idruta"] === idruta) {
          return $scope.rutas[i]["nombre"];
      }
    }
    return idruta;
  };

  $scope.cerrar = function(){
    $cookies.remove('user');
      $location.url('/');
  };

  if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
    $scope.idduenio = $cookies.getObject('user').id;
    $scope.token = $cookies.getObject('user').token;
    $scope.gridOptions = {};
    apiService.obtener('/ruta' + '/' + $scope.token).
    success(function(response, status, headers, config){
      $scope.rutas = response;
      apiService.obtener('/duenio/'+$scope.idduenio+'/buses' + '/' + $scope.token).
      success(function(response, status, headers, config){
        $scope.duenio = {"nombre":response.nombre, "apellidos": response.apellidos};
        $scope.buses = response.buses;
        $scope.gridOptions.data = $scope.buses;
        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.paginationPageSizes = [10, 25, 50];
        $scope.gridOptions.paginationPageSize = 10;
        $scope.gridOptions.columnDefs = [
          {name:'Placa',field:'placa'},
          {name:'No. de bus',field:'numbus'},
          {name:'Ruta', field: 'ruta', cellTemplate: "<div>{{grid.appScope.mapearRuta(row.entity.ruta)}}</div>", enableFiltering: false},
          {name:'Estado', field: 'estado', cellTemplate: "<div>{{grid.appScope.mapearEstado(row.entity.estado)}}</div>", enableFiltering: false},
          {name:' ',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idbus)">Ver más</button></div>', enableFiltering: false}
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
    }).
    error(function(response, status, headers, config) {
      if(status === null || status === -1){
        $location.url('/404');
      }
      else if(status === 401){
        $location.url('/403');
      }
    });
  }
  else{
    $location.url('/login');
  }
});

angular.module('transxelaWebApp').controller('CrearBController', ['$scope', 'apiService', '$uibModalInstance', 'options', 'rutas', 'idduenio',function ($scope, apiService, $uibModalInstance, options, rutas, idduenio) {
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
    estado: parseInt($scope.estado),
    duenio: idduenio
    }, 500);
  };

  $scope.close = function () {
    apiService.crear('/duenio/bus/' + options.token + '/', {
      marca: $scope.marca, modelo: $scope.modelo,
      placa: $scope.placa, numbus: $scope.numbus,
      color: $scope.color, ruta: parseInt($scope.ruta),
      observaciones: $scope.observaciones, estado: parseInt($scope.estado), duenio: idduenio
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

angular.module('transxelaWebApp').controller('VerModificarBController', ['$scope', 'apiService', '$uibModalInstance', 'options', 'bus', 'rutas', function ($scope, apiService, $uibModalInstance, options, bus, rutas) {
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
    apiService.modificar('/duenio/bus/' + bus.idbus + '/' + options.token + '/', {
      marca: $scope.marca, modelo: $scope.modelo,
      placa: $scope.placa, numbus: $scope.numbus,
      color: $scope.color, ruta: parseInt($scope.ruta),
      observaciones: $scope.observaciones, estado: parseInt($scope.estado), duenio: bus.duenio
    }).
    success(function(response, status, headers, config){
      $uibModalInstance.close(response, 500);
    }).
    error(function(response, status, headers, config) {
      $uibModalInstance.dismiss('error');
    });
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);
