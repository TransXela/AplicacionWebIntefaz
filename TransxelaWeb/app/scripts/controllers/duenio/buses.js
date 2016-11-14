'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioBusesCtrl
 * @description
 * # DuenioBusesCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioBusesCtrl', function($scope, apiService, $uibModal,  $location, $cookies, uiGridConstants) {
  $scope.alertas = [];
  $scope.showCrear = function () {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/duenio/bus.html',
      controller:'CrearBController',
      resolve: {
        options: function () {
          return {"title": "Nuevo bus", "buttom": "Crear bus", "token": $scope.token};
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
      $scope.addFiltroRuta(result.ruta);
      $scope.buses.push(result);
      $scope.alertas.push({"tipo":"success", "mensaje": "Bus creado exitosamente"});
    }, function (status) {
      if(status === '403'){
        $location.url('/403');
      }
      else if(status === '404'){
        $location.url('/404');
      }
      else if(status === '500'){
        $location.url('/400');
      }
    });
  };

  $scope.showVerModificar = function (idbus) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/duenio/bus.html",
      controller: "VerModificarBController",
      resolve: {
        options: function () {
          return {"title": "Información del bus", "buttom": "Guardar cambios", "token": $scope.token};
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
      $scope.addFiltroRuta(result.ruta);
      $scope.buses[$scope.index] = result;
      $scope.alertas.push({"tipo":"success", "mensaje": "Bus modificado exitosamente"});
    }, function (status) {
      if(status === '403'){
        $location.url('/403');
      }
      else if(status === '404'){
        $location.url('/404');
      }
      else if(status === '500'){
        $location.url('/400');
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

  $scope.addFiltroRuta = function(idruta){
    var nueva = true;
    for(var i = 0; i<$scope.filtrorutas.length; i++){
      if($scope.filtrorutas[i].value === idruta){
        nueva = false;
        break;
      }
    }
    if(nueva){
      $scope.filtrorutas.push({value: idruta, label: $scope.mapearRuta(idruta)});
    }
  };

  $scope.cerrar = function(){
    $cookies.remove('user');
      $location.url('/');
  };

  if(typeof $cookies.getObject('user') !== 'undefined' && $cookies.getObject('user')){
    $scope.idduenio = $cookies.getObject('user').id;
    $scope.token = $cookies.getObject('user').token;
    $scope.gridOptions = {};
    apiService.obtener('/ruta/?tk=' + $scope.token).
    success(function(response, status, headers, config){
      $scope.rutas = response;
      apiService.obtener('/duenio/'+$scope.idduenio+'/buses/?tk=' + $scope.token).
      success(function(response, status, headers, config){
        $scope.duenio = {"nombre":response.nombre, "apellidos": response.apellidos};
        $scope.buses = response.buses;
        $scope.filtrorutas = [];
        for(var i = 0; i<$scope.buses.length; i++){
          $scope.addFiltroRuta($scope.buses[i].ruta);
        }
        $scope.gridOptions.data = $scope.buses;
        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.paginationPageSizes = [10, 25, 50];
        $scope.gridOptions.paginationPageSize = 10;
        $scope.gridOptions.columnDefs = [
          {name:'Placa',field:'placa', sort: { direction: uiGridConstants.ASC },
            filter: {type: uiGridConstants.filter.STARTS_WITH, placeholder: 'Placa del bus', headerCellClass: $scope.highlightFilteredHeader}},
          {name:'No. de bus',field:'numbus',
            filter: {type: uiGridConstants.filter.STARTS_WITH, placeholder: 'No. de bus', headerCellClass: $scope.highlightFilteredHeader}},
          {name:'Ruta', field: 'ruta', cellTemplate: "<div>{{grid.appScope.mapearRuta(row.entity.ruta)}}</div>",
            filter: {/*term: '1', */type: uiGridConstants.filter.SELECT,
            selectOptions: $scope.filtrorutas}, headerCellClass: $scope.highlightFilteredHeader},
          {name:'Estado', field: 'estado', cellTemplate: "<div>{{grid.appScope.mapearEstado(row.entity.estado)}}</div>",
            filter: {/*term: '1', */type: uiGridConstants.filter.SELECT,
            selectOptions: [ { value: '1', label: 'Habilitado' }, { value: '0', label: 'Deshabilitado' }]}, headerCellClass: $scope.highlightFilteredHeader},
          {name:' ',cellTemplate:'<div class="wrapper text-center"><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idbus)">Ver más</button></div>', enableFiltering: false}
          ];
      }).
      error(function(response, status, headers, config) {
        switch(status) {
          case 400: {
            $location.url('/404');
            break;
          }
          case 403: {
            $location.url('/403');
            break;
          }
          case 404: {
            $location.url('/404');
            break;
          }
          default: {
            $location.url('/500');
          }
        }
      });
    }).
    error(function(response, status, headers, config) {
      $scope.rutas = [];
      $scope.alertas.push({"tipo":"danger", "mensaje": "Ha ocurrido un error al cargar las rutas, recarge la página para poder visualizarlas."});
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
    apiService.crear('/duenio/bus/?tk=' + options.token, {
      marca: $scope.marca, modelo: $scope.modelo,
      placa: $scope.placa, numbus: $scope.numbus,
      color: $scope.color, ruta: parseInt($scope.ruta),
      observaciones: $scope.observaciones, estado: parseInt($scope.estado), duenio: idduenio
    }).
    success(function(data, status, headers, config) {
      $uibModalInstance.close(data, 500);
    }).
    error(function(data, status, headers, config) {
      switch(status) {
        case 400: {
          $uibModalInstance.dismiss('404');
          break;
        }
        case 403: {
          $uibModalInstance.dismiss('403');
          break;
        }
        case 404: {
          $uibModalInstance.dismiss('404');
          break;
        }
        default: {
          $uibModalInstance.dismiss('500');
        }
      }
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
    apiService.modificar('/duenio/bus/' + bus.idbus + '/?tk=' + options.token, {
      marca: $scope.marca, modelo: $scope.modelo,
      placa: $scope.placa, numbus: $scope.numbus,
      color: $scope.color, ruta: parseInt($scope.ruta),
      observaciones: $scope.observaciones, estado: parseInt($scope.estado), duenio: bus.duenio
    }).
    success(function(response, status, headers, config){
      $uibModalInstance.close(response, 500);
    }).
    error(function(response, status, headers, config) {
      switch(status) {
        case 400: {
          $uibModalInstance.dismiss('404');
          break;
        }
        case 403: {
          $uibModalInstance.dismiss('403');
          break;
        }
        case 404: {
          $uibModalInstance.dismiss('404');
          break;
        }
        default: {
          $uibModalInstance.dismiss('500');
        }
      }
    });
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);
