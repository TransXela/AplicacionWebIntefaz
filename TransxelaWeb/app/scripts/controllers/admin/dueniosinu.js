'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:AdminDueniosinuCtrl
 * @description
 * # AdminDueniosinuCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('AdminDueniosinuCtrl', [ '$scope', '$http', 'uiGridConstants','$cookies', '$location' , '$uibModal', '$resource', function ($scope, $http, uiGridConstants, $cookies, $location, $uibModal, $resource) {

    $scope.alertas = [];
    $scope.apiurl = 'http://127.0.0.1:8000';
    var resource = $resource($scope.apiurl+'/duenio/sinusuario');
    var query = resource.query(function(){
      $scope.listado = query;
      $scope.gridOptions.data = $scope.listado;
      $scope.showDetalle($scope.gridOptions.data[0]);

    });
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
            return {"title": "Ver modificar dueño", "buttom": "Modificar","apiurl": $scope.apiurl};
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
            return {"title": "Crear dueño", "buttom": "Crear","apiurl": $scope.apiurl};
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


    $scope.gridOptions = {
      enableFiltering: true,
      showGridFooter: true,
      showColumnFooter: true,

      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      },
      columnDefs: [

        {name: 'Nombre', field: 'nombre', headerCellClass: $scope.highlightFilteredHeader },

        {name: 'Apellidos', field: 'apellidos', headerCellClass: $scope.highlightFilteredHeader },



        {name: 'Estado', field: 'estado', filter: {
            term: '1',
            type: uiGridConstants.filter.SELECT,
            selectOptions: [ { value: '1', label: '1' }]
          },
          cellFilter: 'mapGender2', headerCellClass: $scope.highlightFilteredHeader },

          {name: 'Direccion', field: 'direccion', headerCellClass: $scope.highlightFilteredHeader },

          {name:'Descripcion',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idduenio)">Ver detalles</button></div>', enableFiltering: false}

      ]
    };

    $scope.gridOptions.columnDefs[2].visible = false;

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


angular.module('transxelaWebApp').controller('CrearDuenioController', ['$scope', '$http', '$uibModalInstance', 'options', function ($scope, $http, $uibModalInstance, options) {
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
    var res = $http.post(options.apiurl+'/duenio/', {
      nombre: $scope.nombre, apellidos: $scope.apellidos,
      dpi: String($scope.dpi), direccion: $scope.direccion,
      telefono: $scope.telefono, correo: $scope.correo,
      fecha_nac: $scope.fecha_nac, fecha_crea: $scope.fecha_crea,
      estado: parseInt($scope.estado), empresa: $scope.empresa
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


angular.module('transxelaWebApp').controller('VerModificarDuenioController', ['$scope', '$resource', '$uibModalInstance', 'options', 'dueniousu', function ($scope, $resource, $uibModalInstance, options, dueniousu) {
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
    var resource = $resource(options.apiurl+'/duenio/' + dueniousu.idduenio, {}, {'update': {method:'PUT'}});
    resource.update({}, {
      nombre: $scope.nombre, apellidos: $scope.apellidos,
      direccion: $scope.direccion, dpi:$scope.dpi, empresa: $scope.empresa,
      telefono: $scope.telefono, correo: $scope.correo,
      fecha_nac: $scope.fecha_nac, fecha_crea: $scope.fecha_crea,
      estado: parseInt($scope.estado), idduenio: dueniousu.idduenio
    }).$promise.then(function(data) {
      $uibModalInstance.close(data, 500);
    });
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
