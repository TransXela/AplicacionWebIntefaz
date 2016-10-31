'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:PmtRutasCtrl
 * @description
 * # PmtRutasCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
<<<<<<< Updated upstream
  .controller('PmtRutasCtrl', function ($scope) {
=======
  .controller('PmtRutasCtrl', function ($scope, $uibModal, apiService) {
>>>>>>> Stashed changes
    $scope.alertas = [];
    $scope.showRutas = function () {
      var uibModalInstance = $uibModal.open({
        templateUrl: 'views/pmt/agregarRuta.html',
        controller:'CrearRController'
      });
<<<<<<< Updated upstream
  }});
=======
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
      apiService.obtener('/pmt/rutas/').
      success(function(response, status, headers, config){
        $scope.listado = response;
        $scope.gridOptions.data = $scope.listado;
        $scope.showDetalle($scope.gridOptions.data[0]);
        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.columnDefs = [
          {name:'Nombre',field:'nombre'},
          {name:'Recorrido',field:'recorrido', enableFiltering: false},
          {name:'Detalles',cellTemplate:'<div class="wrapper text-center"><button class="btn btn-info btn-sm" ng-click="grid.appScope.showDetalle(row.entity)">Ver detalles</button></div>', enableFiltering: false}
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

      $scope.showVerModificar = function (idRuta) {
        var uibModalInstance = $uibModal.open({
          templateUrl: "views/pmt/modificarRuta.html",
          controller: "ModCtrl",
          resolve: {
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
  angular.module('transxelaWebApp').controller('CrearRController', ['$scope', 'apiService', '$uibModalInstance', function ($scope, apiService, $uibModalInstance) {
    $scope.nombre = null;
    $scope.recorrido = null;
    $scope.close = function () {
      apiService.crear('/pmt/ruta/', {
        nombre: $scope.nombre, recorrido: $scope.recorrido
      }).
      success(function(data, status, headers, config) {
        $uibModalInstance.close(data, 500);
      }).
      error(function(data, status, headers, config) {
        if(status === null || status === -1){
          $location.url('/404');
        }
        else if(status === 401){
          $location.url('/403');
        }
      });
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }]);

  angular.module('transxelaWebApp').controller('ModCtrl', ['$scope', 'apiService', '$uibModalInstance', 'ruta', function ($scope, apiService, $uibModalInstance, ruta) {
    $scope.nombre = ruta.nombre;
    $scope.recorrido = ruta.recorrido;
    $scope.close = function () {
      apiService.modificar('/pmt/ruta/' + ruta.idruta, {
        nombre: $scope.nombre, recorrido: $scope.recorrido,
        idRuta: ruta.idRuta
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
>>>>>>> Stashed changes
