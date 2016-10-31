'use strict';

/**
* @ngdoc function
* @name transxelaWebApp.controller:PmtDueniosCtrl
* @description
* # PmtDueniosCtrl
* Controller of the transxelaWebApp
*/

angular.module('transxelaWebApp')
.controller('PmtDueniosCtrl', function ($scope, $uibModal, apiService, $cookies) {
  $scope.alertas = [];
  $scope.showDuenio = function () {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/pmt/agregarDuenio.html',
      controller:'DuenioCntrl',
      resolve:{
        token:function(){
          return $scope.token
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
  $scope.showDetalle = function(duenio) {
    $scope.mostrar = duenio;
  };

  if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
    $scope.token = $cookies.getObject('user').token;
    $scope.gridOptions = {};
    apiService.obtener('/pmt/duenio/'+$scope.token).
    success(function(response, status, headers, config){
      $scope.listado = response;
      $scope.gridOptions.data = $scope.listado;
      $scope.showDetalle($scope.gridOptions.data[0]);
      $scope.gridOptions.enableFiltering = true;
      $scope.gridOptions.columnDefs = [
        {name:'Nombre',field:'nombre'},
        {name:'Apellidos',field:'apellidos'},
        {name:'Estado',field:'estado', cellTemplate: "<div>{{grid.appScope.mapearEstado(row.entity.estado)}}</div>", enableFiltering: false},
        {name:'Detalles',cellTemplate:'<div class="wrapper text-center"><button class="btn btn-info btn-sm" ng-click="grid.appScope.showDetalle(row.entity)">Ver detalles</button></div>', enableFiltering: false}
      ];
      $scope.mapearEstado = function(estado) {
        return estado ? 'Habilitado' : 'Deshabilitado';
      };
      $scope.showVerModificar = function (idduenio) {
        var uibModalInstance = $uibModal.open({
          templateUrl: "views/pmt/editarDuenio.html",
          controller: "VerModificarDController",
          resolve: {
            options: function () {
              return {"token": $scope.token};
            },
            duenio: function(){

              $scope.index = $scope.getIndexIfObjWithOwnAttr($scope.listado,"idduenio", idduenio);
              return $scope.listado[$scope.index];
            },
            token:function(){
              return $scope.token
            }
          }
        });
        uibModalInstance.result.then(function (result) {
          $scope.listado[$scope.index] = result;
          $scope.alertas.push({"tipo":"success", "mensaje": "Dueño modificado exitosamente"});
        }, function () {
        });
      };
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
angular.module('transxelaWebApp').controller('DuenioCntrl', ['$scope', '$uibModalInstance','apiService','token', function ($scope, $uibModalInstance, apiService, token) {
  $scope.nombre = null;
  $scope.apellidos = null;
  $scope.direccion = null;
  $scope.empresa = null;
  $scope.fecha_nac = new Date();
  $scope.fecha_crea = new Date();
  $scope.dpi = null;
  $scope.telefono = null;
  $scope.correo = null;
  $scope.estado = "1";
  $scope.usuario_id =null;
  $scope.close = function () {
  apiService.crear('/pmt/duenio/'+ token +'/', {
    nombre: $scope.nombre, apellidos: $scope.apellidos, direccion: $scope.direccion, empresa: $scope.empresa,
    fecha_nac: "2009-02-20 00:00:00", fecha_crea: "2009-02-20 00:00:00", dpi: String($scope.dpi), telefono: $scope.telefono,
    correo: $scope.correo, estado: parseInt($scope.estado)
    })
    .success(function(data, status, headers, config) {
      $uibModalInstance.close(data, 500);
    })
    .error(function(data, status, headers, config) {
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
  $scope.formatoFecha = function(fecha){
    return fecha.getFullYear() + "-" + (fecha.getMonth()+1) + "-" + fecha.getDate();
  }
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };
  $scope.setDate = function(year, month, day) {
    $scope.fecha = new Date(year, month, day);
  };
  $scope.popup1 = {
    opened: false
  };
  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 0
  };
}]);

angular.module('transxelaWebApp').controller('VerModificarDController', ['$scope', 'apiService', '$uibModalInstance', 'options', 'duenio', 'token', function ($scope, apiService, $uibModalInstance, options, duenio, token) {
  $scope.nombre = duenio.nombre;
  $scope.apellidos = duenio.apellidos;
  $scope.dpi = parseInt(duenio.dpi);
  $scope.direccion = duenio.direccion;
  $scope.telefono = duenio.telefono;
  $scope.correo = duenio.correo;
  $scope.empresa = duenio.empresa;
  $scope.estado = String(duenio.estado);
  $scope.close = function () {
      apiService.modificar('/pmt/duenio/' + duenio.idduenio +'/'+ token+ '/', {
      nombre: $scope.nombre, apellidos: $scope.apellidos, dpi: String($scope.dpi),
      direccion: $scope.direccion, fecha_nac: "2009-02-20 00:00:00", fecha_crea: "2009-02-20 00:00:00",
      telefono: $scope.telefono, correo: $scope.correo, empresa: $scope.empresa,
      estado: parseInt($scope.estado), idduenio: duenio.idduenio
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
