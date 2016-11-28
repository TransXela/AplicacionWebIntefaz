'use strict';

/**
* @ngdoc function
* @name transxelaWebApp.controller:PmtDueniosCtrl
* @description
* # PmtDueniosCtrl
* Controller of the transxelaWebApp
*/

angular.module('transxelaWebApp')
.controller('PmtDueniosCtrl', function ($scope, $uibModal, apiService, $cookies, uiGridConstants,  $location) {
  $scope.alertas = [];
  $scope.usuario = $cookies.getObject('user').usuario;
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
  $scope.mapearEstado = function(estado) {
    return estado ? 'Habilitado' : 'Deshabilitado';
  };
  $scope.cerrar = function(){
    $cookies.remove('user');
    $location.url('/');
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
    apiService.obtener('/pmt/duenio/?tk='+$scope.token).
    success(function(response, status, headers, config){
      $scope.listado = response;
      $scope.gridOptions.data = $scope.listado;
      $scope.showDetalle($scope.gridOptions.data[0]);
      $scope.gridOptions.enableFiltering = true;
      $scope.gridOptions.paginationPageSizes = [10, 25, 50];
      $scope.gridOptions.paginationPageSize = 10;
      $scope.gridOptions.columnDefs = [
        {name:'Nombre',field:'nombre'},
        {name:'Apellidos',field:'apellidos'},
        {name:'Estado',field:'estado', cellTemplate: "<div>{{grid.appScope.mapearEstado(row.entity.estado)}}</div>",
            filter: {/*term: '1', */type: uiGridConstants.filter.SELECT,
            selectOptions: [ { value: '1', label: 'Habilitado' }, { value: '0', label: 'Deshabilitado' }]}, headerCellClass: $scope.highlightFilteredHeader},
        {name:'Detalles',cellTemplate:'<div class="wrapper text-center"><button class="btn btn-info btn-sm" ng-click="grid.appScope.showDetalle(row.entity)">Ver Más</button></div>', enableFiltering: false}
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
  apiService.crear('/pmt/duenio/?tk='+ token, {
    nombre: $scope.nombre, apellidos: $scope.apellidos, direccion: $scope.direccion, empresa: $scope.empresa,
    fecha_nac: "2009-02-20 00:00:00", fecha_crea: "2009-02-20 00:00:00", dpi: String($scope.dpi), telefono: $scope.telefono,
    correo: $scope.correo, estado: parseInt($scope.estado)
    })
    .success(function(data, status, headers, config) {
      $uibModalInstance.close(data, 500);
    })
    .error(function(data, status, headers, config) {
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
      apiService.modificar('/pmt/duenio/' + duenio.idduenio +'/?tk='+ token, {
      nombre: $scope.nombre, apellidos: $scope.apellidos, dpi: String($scope.dpi),
      direccion: $scope.direccion, fecha_nac: "2009-02-20 00:00:00", fecha_crea: "2009-02-20 00:00:00",
      telefono: $scope.telefono, correo: $scope.correo, empresa: $scope.empresa,
      estado: parseInt($scope.estado), idduenio: duenio.idduenio
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
