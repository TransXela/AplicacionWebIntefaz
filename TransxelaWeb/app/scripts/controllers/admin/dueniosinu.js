'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:AdminDueniosinuCtrl
 * @description
 * # AdminDueniosinuCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('AdminDueniosinuCtrl', [ '$scope', 'uiGridConstants','$cookies', '$location' , '$uibModal', '$resource', 'apiService', function ($scope, uiGridConstants, $cookies, $location, $uibModal, $resource, apiService) {

    $scope.alertas = [];
    $scope.apiurl = 'http://127.0.0.1:8000';

    $scope.mapearEstado = function(estado) {
      return estado ? 'Habilitado' : 'Deshabilitado';
    };

    $scope.getIndexIfObjWithOwnAttr = function(array, attr, value) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    };

    $scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
      if( col.filters[0].term ){
        return 'header-filtered';
      } else {
        return '';
      }
    };

    // ----------------------------------- VER MODIFICAR --------------------------------------------------------------
    $scope.showVerModificar = function (idduenio) {
      var uibModalInstance = $uibModal.open({
        templateUrl: "views/admin/dueniosinusu.html",
        controller: "VerModificarDuenioController",
        resolve: {
          options: function () {
            return {"title": "Ver modificar dueño", "buttom": "Modificar","token": $scope.token};
          },
          dueniousu: function(){
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
    // ----------------------------------- END VER MODIFICAR --------------------------------------------------------------



    // ----------------------------------- VER CREAR PMT --------------------------------------------------------------
    $scope.crearDuenio = function () {
      var uibModalInstance = $uibModal.open({
        templateUrl: 'views/admin/dueniosinusu.html',
        controller:'CrearDuenioController',
        resolve: {
          options: function () {
            return {"title": "Crear persona dueño", "buttom": "Crear","token": $scope.token};
          }
        }
      });
      uibModalInstance.result.then(function (result) {
        $scope.listado.push(result);
        $scope.alertas.push({"tipo":"success", "mensaje": "Dueño creado exitosamente"});
      }, function () {
      });
    };
    // ----------------------------------- END CREAR PMT --------------------------------------------------------------

    if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
      $scope.token = $cookies.getObject('user').token;
      $scope.gridOptions = {
        enableFiltering: true,
        showGridFooter: true,
        showColumnFooter: true,
      };

      apiService.obtener('/duenio/sinusuario?tk=' + $scope.token).
      success(function(response, status, headers, config){
        $scope.listado = response;
        $scope.gridOptions.data = $scope.listado;
        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.columnDefs = [
          {name: 'Nombre', field: 'nombre', headerCellClass: $scope.highlightFilteredHeader },
          {name: 'Apellidos', field: 'apellidos', headerCellClass: $scope.highlightFilteredHeader },
          {name: 'Estado', field: 'estado', cellTemplate: "<div>{{grid.appScope.mapearEstado(row.entity.estado)}}</div>",filter: {
              term: '1',
              type: uiGridConstants.filter.SELECT,
              selectOptions: [ { value: '1', label: 'Habilitado' }, { value: '0', label: 'Deshabilitado' }]
            },
            cellFilter: 'mapGender2', headerCellClass: $scope.highlightFilteredHeader },

            {name: 'Direccion', field: 'direccion', headerCellClass: $scope.highlightFilteredHeader },
            {name:'Descripcion',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idduenio)">Ver detalles</button></div>', enableFiltering: false}
        ];

      }).
      error(function(response, status, headers, config) {
      });

    }
    else{
      $location.url('/login');
    }




    //$scope.gridOptions.columnDefs[2].visible = false;

    $scope.toggleFiltering = function(){
      $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
      $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
    };

    $scope.showDetalle = function(dueniousu) {
      $scope.mostrar = dueniousu;
    };


  }])


  .filter('mapGender2', function() {
  var genderHash2 = {
    1: '1',
    2: '0',
  };

  return function(input) {
    if (!input){
      return '';
    } else {
      return genderHash2[input];
    }
  };
});


angular.module('transxelaWebApp').controller('CrearDuenioController', ['$scope', '$uibModalInstance', 'options', 'apiService', function ($scope, $uibModalInstance, options, apiService) {
  $scope.nombre = null;
  $scope.fecha_nac = new Date("March 20, 2009 7:00:00");
  $scope.fecha_crea = new Date("March 20, 2009 7:00:00");
  $scope.apellidos = null;
  $scope.direccion = null;
  $scope.empresa = null;
  $scope.dpi = null;
  $scope.telefono = null;
  $scope.correo = null;
  $scope.estado = "1";
  $scope.options = options;
  $scope.alertas = [];
  $scope.close = function () {
    apiService.crear('/pmt/duenio/?tk=' + options.token, {
      nombre: $scope.nombre, apellidos: $scope.apellidos,
      dpi: String($scope.dpi), direccion: $scope.direccion,
      telefono: $scope.telefono, correo: $scope.correo,
      fecha_nac: $scope.fecha_nac, fecha_crea: $scope.fecha_crea,
      estado: parseInt($scope.estado), empresa: $scope.empresa
    }).
    success(function(data, status, headers, config) {
      $uibModalInstance.close(data, 500);
    })
    .error(function(data, status, headers, config) {
      $uibModalInstance.dismiss('error');
    });
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);


angular.module('transxelaWebApp').controller('VerModificarDuenioController', ['$scope', '$resource', '$uibModalInstance', 'options', 'dueniousu', 'apiService', function ($scope, $resource, $uibModalInstance, options, dueniousu, apiService) {
  $scope.fecha_nac = new Date("March 20, 2009 7:00:00");
  $scope.fecha_crea = new Date("March 20, 2009 7:00:00");
  $scope.nombre = dueniousu.nombre;
  $scope.apellidos = dueniousu.apellidos;
  $scope.empresa = dueniousu.empresa;
  $scope.dpi = parseInt(dueniousu.dpi);
  $scope.direccion = dueniousu.direccion;
  $scope.telefono = dueniousu.telefono;
  $scope.correo = dueniousu.correo;
  $scope.estado = String(dueniousu.estado);
  $scope.options = options;
  $scope.alertas = [];
  $scope.close = function () {
    apiService.modificar('/duenio/' + dueniousu.idduenio + '/?tk=' + options.token, {
      nombre: $scope.nombre, apellidos: $scope.apellidos,
      direccion: $scope.direccion, dpi:$scope.dpi, empresa: $scope.empresa,
      telefono: $scope.telefono, correo: $scope.correo,
      fecha_nac: $scope.fecha_nac, fecha_crea: $scope.fecha_crea,
      estado: parseInt($scope.estado), idduenio: dueniousu.idduenio
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
