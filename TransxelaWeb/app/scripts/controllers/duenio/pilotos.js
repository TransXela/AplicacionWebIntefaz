'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPilotosCtrl
 * @description
 * # DuenioPilotosCtrl
 * Controller of the transxelaWebApp
 */

angular.module('transxelaWebApp').controller('DuenioPilotosCtrl', function($scope, apiService, $uibModal, $location, $cookies, uiGridConstants) {
  $scope.alertas = [];
  $scope.showCrear = function () {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/duenio/piloto.html',
      controller:'CrearPController',
      resolve: {
        options: function () {
          return {"title": "Crear Piloto", "buttom": "Crear", "token": $scope.token};
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

  $scope.showVerModificar = function (idchofer) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/duenio/piloto.html",
      controller: "VerController",
      resolve: {
        options: function () {
          return {"title": "Ver Piloto", "buttom": "Modificar", "token": $scope.token};
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

  $scope.cerrar = function(){
    $cookies.remove('user');
    $location.url('/');
  };

  if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
    $scope.idduenio = $cookies.getObject('user').id;
    $scope.token = $cookies.getObject('user').token;
    $scope.gridOptions = {};
    apiService.obtener('/duenio/'+$scope.idduenio+'/pilotos' + '?tk=' + $scope.token).
    success(function(response, status, headers, config){
      $scope.duenio = {"nombre":response.nombre, "apellidos": response.apellidos};
      $scope.pilotos = response.choferes;
      $scope.gridOptions.data = $scope.pilotos;
      $scope.gridOptions.enableFiltering = true;
      $scope.gridOptions.paginationPageSizes = [10, 25, 50];
      $scope.gridOptions.paginationPageSize = 10;
      $scope.gridOptions.columnDefs = [
        {name:'Nombre',field:'nombre', sort: { direction: uiGridConstants.ASC }},
        {name:'Apellidos',field:'apellidos'},
        {name:'DPI',field:'dpi'},
        {name:'Estado',field:'estado', cellTemplate: "<div>{{grid.appScope.mapearEstado(row.entity.estado)}}</div>",
          filter: {/*term: '1', */type: uiGridConstants.filter.SELECT,
          selectOptions: [ { value: '1', label: 'Habilitado' }, { value: '0', label: 'Deshabilitado' }]}, headerCellClass: $scope.highlightFilteredHeader},
        {name:' ',cellTemplate:'<div class="wrapper text-center"><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idchofer)">Ver más</button></div>', enableFiltering: false}
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
  }
  else{
    $location.url('/login');
  }
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
    apiService.crear('/duenio/piloto/?tk=' + options.token, {
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

angular.module('transxelaWebApp').controller('VerController', ['$scope', 'apiService', '$uibModalInstance', 'options', 'piloto', function ($scope, apiService, $uibModalInstance, options, piloto) {
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
    apiService.modificar('/duenio/piloto/' + piloto.idchofer + '/?tk=' + options.token, {
      nombre: $scope.nombre, apellidos: $scope.apellidos, dpi: String($scope.dpi),
      direccion: $scope.direccion, licencia: $scope.licencia, tipolicencia: $scope.tipolicencia,
      telefono: $scope.telefono, correo: $scope.correo,
      estado: parseInt($scope.estado), duenio: piloto.duenio
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
