'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:PmtDueniosCtrl
 * @description
 * # PmtDueniosCtrl
 * Controller of the transxelaWebApp
 */

angular.module('transxelaWebApp')
  .controller('PmtDueniosCtrl', function ($scope, $uibModal, $resource) {
  $scope.alertas = [];
  $scope.apiurl = 'http://127.0.0.1:8000';
  $scope.showDuenio = function () {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/pmt/agregarDuenio.html',
      controller:'CrearDController',
      resolve: {
        options: function () {
          return {"apiurl": $scope.apiurl};
        }
      }
    });
    uibModalInstance.result.then(function (result) {
      $scope.listado.push(result);
      $scope.alertas.push({"tipo":"success", "mensaje": "Dueño creado exitosamente"});
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
  var resource = $resource($scope.apiurl+'/pmt/duenio/');
  var query = resource.query(function(){
    $scope.listado = query;
    $scope.gridOptions.data = $scope.listado;
    $scope.showDetalle($scope.gridOptions.data[0]);
    $scope.gridOptions.enableFiltering = true;
    $scope.gridOptions.columnDefs = [
      {name:'Nombre',field:'nombre'},
      {name:'Apellidos',field:'apellidos'},
      {name:'Estado',field:'estado', cellTemplate: "<div>{{grid.appScope.mapearEstado(row.entity.estado)}}</div>", enableFiltering: false},
      {name:'Detalles',cellTemplate:'<div class="wrapper text-center"><button class="btn btn-info btn-sm" ng-click="grid.appScope.showDetalle(row.entity)">Ver detalles</button></div>', enableFiltering: false}
      ];
  });
  $scope.mapearEstado = function(estado) {
            return estado ? 'Habilitado' : 'Deshabilitado';
  };
  $scope.showVerModificar = function (idduenio) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/pmt/editarDuenio.html",
      controller: "VerModificarDController",
      resolve: {
        options: function () {
          return {"apiurl": $scope.apiurl};
        },
        duenio: function(){
          $scope.index = $scope.getIndexIfObjWithOwnAttr($scope.listado,"idduenio", idduenio);
          return $scope.listado[$scope.index];
        }
      }
    });
    uibModalInstance.result.then(function (result) {
      $scope.listado[$scope.index] = result;
      $scope.alertas.push({"tipo":"success", "mensaje": "Dueño modificado exitosamente"});
    }, function () {
    });
  };
  $scope.showDetalle = function(duenio) {
    $scope.mostrar = duenio;

  };
  });

  angular.module('transxelaWebApp').controller('CrearDController', ['$scope', '$http', '$uibModalInstance', 'options', function ($scope, $http, $uibModalInstance, options) {
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
      var res = $http.post(options.apiurl+'/pmt/duenio/', {
        nombre: $scope.nombre, apellidos: $scope.apellidos,
        dpi: String($scope.dpi), direccion: $scope.direccion,
        telefono: $scope.telefono, correo: $scope.correo, foto: "HOLA",
        estado: parseInt($scope.estado)
      });
      res.success(function(data, status, headers, config) {
        $uibModalInstance.close(data, 500);
      });
      res.error(function(data, status, headers, config) {
        console.log(data);
      });
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
  }]);

  angular.module('transxelaWebApp').controller('VerModificarDController', ['$scope', '$resource', '$uibModalInstance', 'options', 'duenio', function ($scope, $resource, $uibModalInstance, options, duenio) {
    $scope.nombre = duenio.nombre;
    $scope.apellidos = duenio.apellidos;
    $scope.dpi = parseInt(duenio.dpi);
    $scope.direccion = duenio.direccion;
    $scope.telefono = duenio.telefono;
    $scope.correo = duenio.correo;
    $scope.foto = "no hay";
    $scope.estado = String(duenio.estado);
    $scope.options = options;
    $scope.close = function () {
      var resource = $resource(options.apiurl+'/pmt/duenio/' + duenio.idduenio, {}, {'update': {method:'PUT'}});
      resource.update({}, {
        nombre: $scope.nombre, apellidos: $scope.apellidos, dpi: String($scope.dpi),
        direccion: $scope.direccion, foto: "noHay",
        telefono: $scope.telefono, correo: $scope.correo,
        estado: parseInt($scope.estado), idduenio: duenio.idduenio
      }).$promise.then(function(data) {
        $uibModalInstance.close(data, 500);
      }, function(error) {
        console.log(error);
      });
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
  }]);
