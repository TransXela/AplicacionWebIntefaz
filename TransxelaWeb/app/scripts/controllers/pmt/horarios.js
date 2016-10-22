'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:PmtHorariosCtrl
 * @description
 * # PmtHorariosCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('PmtHorariosCtrl', function () {
    $scope.alertas = [];
    $scope.apiurl = 'http://127.0.0.1:8000';
    $scope.showDuenio = function () {
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


  $scope.getIndexIfObjWithOwnAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  };


  $scope.gridOptions = {};
  var resource = $resource($scope.apiurl+'/pmt/ruta/');
  var query = resource.query(function(){
    $scope.listado = query;
    $scope.gridOptions.data = $scope.listado;
    $scope.showDetalle($scope.gridOptions.data[0]);
    $scope.gridOptions.enableFiltering = true;
    $scope.gridOptions.columnDefs = [
      {name:'Nombre',field:'nombre'},
      {name:'Recorrido',field:'recorrido'}
      {name:'Detalles',cellTemplate:'<div class="wrapper text-center"><button class="btn btn-info btn-sm" ng-click="grid.appScope.showDetalle(row.entity)">Ver detalles</button></div>', enableFiltering: false}
      ];
  });
  $scope.mapearEstado = function(estado) {
            return estado ? 'Habilitado' : 'Deshabilitado';
  };

  $scope.showVerModificar = function (idduenio) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/pmt/editarRuta.html",
      controller: "VerModificarRController",
      resolve: {
        options: function () {
          return {"apiurl": $scope.apiurl};
        },
        duenio: function(){
          $scope.index = $scope.getIndexIfObjWithOwnAttr($scope.listado,"idruta", idruta);
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
  $scope.showDetalle = function(duenio) {
    $scope.mostrar = duenio;

  };

  });
