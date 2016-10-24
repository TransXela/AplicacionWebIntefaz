'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioBusesCtrl
 * @description
 * # DuenioBusesCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioBusesCtrl', function($scope, $resource, $uibModal,  $location, $cookies) {
  $scope.idduenio = $cookies.getObject('user').id;
  $scope.alertas = [];
  //$scope.apiurl = 'http://127.0.0.1:8000';
  $scope.apiurl = 'http://'+ $cookies.getObject('user').apiurl +':8000';
  $scope.showCrear = function () {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/duenio/bus.html',
      controller:'CrearBController',
      resolve: {
        options: function () {
          return {"title": "Crear Bus", "buttom": "Crear", "apiurl": $scope.apiurl};
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
          return {"title": "Ver Bus", "buttom": "Modificar", "apiurl": $scope.apiurl};
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


  $scope.gridOptions = {};

  var resource = $resource($scope.apiurl+'/ruta');
  $scope.rutas = resource.query(function(){
    resource = $resource($scope.apiurl+'/duenio/'+$scope.idduenio+'/buses');
    var query = resource.get(function(){
      $scope.duenio = {"nombre":query.nombre, "apellidos": query.apellidos};
      $scope.buses = query.buses;
      $scope.gridOptions.data = $scope.buses;
      $scope.gridOptions.enableFiltering = true;
      $scope.gridOptions.columnDefs = [
        {name:'Placa',field:'placa'},
        {name:'Marca',field:'marca'},
        {name:'Modelo',field:'modelo'},
        {name:'Ruta', field: 'ruta', cellTemplate: "<div>{{grid.appScope.mapearRuta(row.entity.ruta)}}</div>", enableFiltering: false},
        {name:'Estado', field: 'estado', cellTemplate: "<div>{{grid.appScope.mapearEstado(row.entity.estado)}}</div>", enableFiltering: false},
        {name:' ',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idbus)">Ver detalles</button></div>', enableFiltering: false}
        ];
    });
  }, function(response) {
    $location.url('/404');
  });
});

angular.module('transxelaWebApp').controller('CrearBController', ['$scope', '$http', '$uibModalInstance', 'options', 'rutas', 'idduenio',function ($scope, $http, $uibModalInstance, options, rutas, idduenio) {
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
    var res = $http.post(options.apiurl+'/duenio/bus/', {
      marca: $scope.marca, modelo: $scope.modelo,
      placa: $scope.placa, numbus: $scope.numbus,
      color: $scope.color, ruta: parseInt($scope.ruta),
      observaciones: $scope.observaciones, estado: parseInt($scope.estado), duenio: idduenio
    });
    res.success(function(data, status, headers, config) {
      $uibModalInstance.close(data, 500);
    });
    res.error(function(data, status, headers, config) {
      $uibModalInstance.dismiss('error');
    });
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);

angular.module('transxelaWebApp').controller('VerModificarBController', ['$scope', '$resource', '$uibModalInstance', 'options', 'bus', 'rutas', function ($scope, $resource, $uibModalInstance, options, bus, rutas) {
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
    var resource = $resource(options.apiurl+'/duenio/bus/' + bus.idbus, {}, {'update': {method:'PUT'}});
    resource.update({}, {
      marca: $scope.marca, modelo: $scope.modelo,
      placa: $scope.placa, numbus: $scope.numbus,
      color: $scope.color, ruta: parseInt($scope.ruta),
      observaciones: $scope.observaciones, estado: parseInt($scope.estado), duenio: bus.duenio
    }).$promise.then(function(data) {
      console.log(data);
      $uibModalInstance.close(data, 500);
    }, function(error) {
      $uibModalInstance.dismiss('error');
    });
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);
