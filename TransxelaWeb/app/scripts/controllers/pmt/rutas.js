'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:PmtRutasCtrl
 * @description
 * # PmtRutasCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('PmtRutasCtrl', function ($scope, $uibModal, $resource) {
    $scope.alertas = [];
    $scope.apiurl = 'http://127.0.0.1:8000';
    $scope.showRutas = function () {
      var uibModalInstance = $uibModal.open({
        templateUrl: 'views/pmt/agregarRuta.html',
        controller:'CrearRController',
        resolve: {
          options: function () {
            return {"apiurl": $scope.apiurl};
          }
        }
      });
      uibModalInstance.result.then(function (result) {
        $scope.listado.push(result);
        $scope.alertas.push({"tipo":"success", "mensaje": "Ruta creada exitosamente"});
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
      var resource = $resource($scope.apiurl+'/pmt/rutas/');
      var query = resource.query(function(){

        $scope.listado = query;
        $scope.gridOptions.data = $scope.listado;
        $scope.showDetalle($scope.gridOptions.data[0]);
        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.columnDefs = [
          {name:'Nombre',field:'nombre'},
          {name:'Recorrido',field:'recorrido', enableFiltering: false},
          {name:'Detalles',cellTemplate:'<div class="wrapper text-center"><button class="btn btn-info btn-sm" ng-click="grid.appScope.showDetalle(row.entity)">Ver detalles</button></div>', enableFiltering: false}
        ];
      });

      $scope.showVerModificar = function (idRuta) {
        var uibModalInstance = $uibModal.open({
          templateUrl: "views/pmt/modificarRuta.html",
          controller: "VerModificarRController",
          resolve: {
            options: function () {
              return {"apiurl": $scope.apiurl};
            },
            ruta: function(){
              $scope.index = $scope.getIndexIfObjWithOwnAttr($scope.listado,"idruta", idRuta);
              return $scope.listado[$scope.index];
            }
          }
        });
        uibModalInstance.result.then(function (result) {
          $scope.listado[$scope.index] = result;
          $scope.alertas.push({"tipo":"success", "mensaje": "Ruta modificada exitosamente"});
        }, function () {
        });
      };
      $scope.showDetalle = function(ruta) {
        $scope.mostrar = ruta;

      };




  });


  angular.module('transxelaWebApp').controller('CrearRController', ['$scope', '$http', '$uibModalInstance', 'options', function ($scope, $http, $uibModalInstance, options) {
    $scope.nombre = null;
    $scope.recorrido = null;
    $scope.options = options;
    $scope.close = function () {
      var res = $http.post(options.apiurl+'/pmt/ruta/', {
        nombre: $scope.nombre, recorrido: $scope.recorrido
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

  angular.module('transxelaWebApp').controller('VerModificarRController', ['$scope', '$resource', '$uibModalInstance', 'options', 'ruta', function ($scope, $resource, $uibModalInstance, options, ruta) {
    $scope.nombre = ruta.nombre;
    $scope.recorrido = ruta.recorrido;
    $scope.options = options;
    $scope.close = function () {
      var resource = $resource(options.apiurl+'/pmt/ruta/' + ruta.idRuta, {}, {'update': {method:'PUT'}});
      resource.update({}, {
        nombre: $scope.nombre, recorrido: $scope.recorrido,
        idRuta: ruta.idRuta
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
