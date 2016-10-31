'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:AdminLispmtsinuCtrl
 * @description
 * # AdminLispmtsinuCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('AdminLispmtsinuCtrl', [ '$scope', '$http', 'uiGridConstants','$cookies', '$location' , '$uibModal', '$resource', function ($scope, $http, uiGridConstants, $cookies, $location, $uibModal, $resource) {
    $scope.alertas = [];
    $scope.apiurl = 'http://127.0.0.1:8000';
    var resource = $resource($scope.apiurl+'/pmt/sinusuario');
    var query = resource.query(function(){
      $scope.listado = query;
      $scope.gridOptions.data = $scope.listado;

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
    $scope.showVerModificar = function (idpmt) {
      var uibModalInstance = $uibModal.open({
        templateUrl: "views/admin/lispmtsinusu.html",
        controller: "VerModificarDController",
        resolve: {
          options: function () {
            return {"title": "Ver modificar PMT", "buttom": "Modificar","apiurl": $scope.apiurl};
          },
          pmtusu: function(){
            $scope.index = $scope.getIndexIfObjWithOwnAttr($scope.listado,"idpmt", idpmt);
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
    $scope.crearPMT = function () {
      var uibModalInstance = $uibModal.open({
        templateUrl: 'views/admin/lispmtsinusu.html',
        controller:'CrearDController',
        resolve: {
          options: function () {
            return {"title": "Crear PMT", "buttom": "Crear","apiurl": $scope.apiurl};
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

          {name:'Descripcion',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idpmt)">Ver detalles</button></div>', enableFiltering: false}

      ]
    };

    $scope.gridOptions.columnDefs[2].visible = false;

    $scope.toggleFiltering = function(){
      $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
      $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
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


angular.module('transxelaWebApp').controller('CrearDController', ['$scope', '$http', '$uibModalInstance', 'options', function ($scope, $http, $uibModalInstance, options) {
  $scope.nombre = null;
  $scope.apellidos = null;
  $scope.dpi = null;
  $scope.direccion = null;
  $scope.telefono = null;
  $scope.correo = null;
  $scope.estado = "1";
  $scope.options = options;
  $scope.close = function () {
    var res = $http.post(options.apiurl+'/pmt/', {
      nombre: $scope.nombre, apellidos: $scope.apellidos,
      dpi: String($scope.dpi), direccion: $scope.direccion,
      telefono: $scope.telefono, correo: $scope.correo,
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


angular.module('transxelaWebApp').controller('VerModificarDController', ['$scope', '$resource', '$uibModalInstance', 'options', 'pmtusu', function ($scope, $resource, $uibModalInstance, options, pmtusu) {
  $scope.nombre = pmtusu.nombre;
  $scope.apellidos = pmtusu.apellidos;
  $scope.dpi = parseInt(pmtusu.dpi);
  $scope.direccion = pmtusu.direccion;
  $scope.telefono = pmtusu.telefono;
  $scope.correo = pmtusu.correo;
  $scope.estado = String(pmtusu.estado);
  $scope.options = options;
  $scope.close = function () {
    var resource = $resource(options.apiurl+'/pmt/' + pmtusu.idpmt, {}, {'update': {method:'PUT'}});
    resource.update({}, {
      nombre: $scope.nombre, apellidos: $scope.apellidos,
      direccion: $scope.direccion, dpi:$scope.dpi,
      telefono: $scope.telefono, correo: $scope.correo,
      estado: parseInt($scope.estado), idpmt: pmtusu.idpmt
    }).$promise.then(function(data) {
      $uibModalInstance.close(data, 500);
    });
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
