'use strict';

/**
* @ngdoc function
* @name transxelaWebApp.controller:PmtRutasCtrl
* @description
* # PmtRutasCtrl
* Controller of the transxelaWebApp
*/
angular.module('transxelaWebApp').controller('PmtRutasCtrl', function ($scope, $uibModal, apiService, $cookies, $location) {
  $scope.alertas = [];
  $scope.showRutas = function () {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/pmt/agregarRuta.html',
      controller:'CrearRController',
      resolve:{
        token:function(){
          return $scope.token
        }
      }
    });
    uibModalInstance.result.then(function (result) {
      $scope.listado.push(result);
      $scope.alertas.push({"tipo":"success", "mensaje": "Ruta creada exitosamente"});
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
  $scope.cerrar = function(){
    $cookies.remove('user');
    $location.url('/');
  };
  $scope.showDetalle = function(ruta) {
    $scope.mostrar = ruta;
  };
  if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
      $scope.token = $cookies.getObject('user').token;
      $scope.gridOptions = {};
      apiService.obtener('/pmt/rutas/?tk='+$scope.token).
      success(function(response, status, headers, config){
        $scope.listado = response;
        $scope.gridOptions.data = $scope.listado;
        $scope.showDetalle($scope.gridOptions.data[0]);
        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.paginationPageSizes = [10, 25, 50];
        $scope.gridOptions.paginationPageSize = 10;
        $scope.gridOptions.columnDefs = [
          {name:'Nombre',field:'nombre'},
          {name:'Recorrido',field:'recorrido', enableFiltering: false},
          {name:'Detalles',cellTemplate:'<div class="wrapper text-center"><button class="btn btn-info btn-sm" ng-click="grid.appScope.showDetalle(row.entity)">Ver Más</button></div>', enableFiltering: false}
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
            },
            options: function () {
              return {"token": $scope.token};
            },
            token:function(){
              return $scope.token
            }
          }

        });
        uibModalInstance.result.then(function (result) {
          $scope.listado[$scope.index] = result;
          $scope.alertas.push({"tipo":"success", "mensaje": "Ruta modificada exitosamente"});
          $scope.showDetalle(result);
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
  }
  else{
    $location.url('/login');
  }


});
angular.module('transxelaWebApp').controller('CrearRController', ['$scope', 'apiService', '$uibModalInstance', 'token', function ($scope, apiService, $uibModalInstance, token) {
  $scope.nombre = null;
  $scope.recorrido = null;
  $scope.close = function () {
    apiService.crear('/pmt/ruta/?tk='+token, {
      nombre: $scope.nombre, recorrido: $scope.recorrido
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

angular.module('transxelaWebApp').controller('ModCtrl', ['$scope', 'apiService', '$uibModalInstance', 'ruta', 'token', function ($scope, apiService, $uibModalInstance, ruta, token) {
  $scope.nombre = ruta.nombre;
  $scope.recorrido = ruta.recorrido;

  $scope.close = function () {
    apiService.modificar('/pmt/ruta/'+ ruta.idruta+'/?tk='+ token, {
      nombre: $scope.nombre, recorrido: $scope.recorrido,
      idRuta: ruta.idRuta
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
