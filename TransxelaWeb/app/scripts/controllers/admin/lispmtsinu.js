'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:AdminLispmtsinuCtrl
 * @description
 * # AdminLispmtsinuCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('AdminLispmtsinuCtrl', [ '$scope', '$http', 'uiGridConstants','$cookies', '$location' , '$uibModal', function ($scope, $http, uiGridConstants, $cookies, $location, $uibModal) {

    $scope.apiurl = 'http://127.0.0.1:8000';
    var res = $http.get($scope.apiurl+'/pmt/sinusuario');
      res.success(function(response, status, headers, config) {
        $scope.datos = response;
        $scope.gridOptions.data = response;
        // data.forEach( function addDates( row, index ){
        //   row.estado = row.estado==='1' ? '1' : '2';
        // });
      });
      res.error(function(response, status, headers, config) {
        $location.url('/404');
      });


    $scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
      if( col.filters[0].term ){
        return 'header-filtered';
      } else {
        return '';
      }
    };

    // ----------------------------------- VER MODIFICAR --------------------------------------------------------------
    $scope.showVerModificar = function (idPmt) {
      var uibModalInstance = $uibModal.open({
        templateUrl: "views/admin/lispmtsinusu",
        controller: "VerModificarPController",
        resolve: {
          options: function () {
            return {"title": "Ver PMT", "buttom": "Modificar", "apiurl": $scope.apiurl};
          },
          pmtusu: function(){
            $scope.index = $scope.getIndexIfObjWithOwnAttr($scope.datos,"idPmt", idPmt);
            return $scope.datos[$scope.index];
          }
        }
      });

      uibModalInstance.result.then(function (result) {
        $scope.datos[$scope.index] = result;
        $scope.alertas.push({"tipo":"success", "mensaje": "PMT modificado exitosamente"});
      }, function (status) {
        if(status === 'error'){
          $location.url('/404');
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
    // ----------------------------------- END VER MODIFICAR --------------------------------------------------------------

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

          {name:'Descripcion',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idPmt)">Ver detalles</button></div>', enableFiltering: false}

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


angular.module('transxelaWebApp').controller('VerModificarPController', ['$scope', '$resource', '$uibModalInstance', 'options', 'pmtusu', function ($scope, $resource, $uibModalInstance, options, pmtusu) {
  $scope.nombre = pmtusu.nombre;
  $scope.apellidos = pmtusu.apellidos;
  $scope.dpi = parseInt(pmtusu.dpi);
  $scope.direccion = pmtusu.direccion;
  $scope.empresa = pmtusu.empresa;
  $scope.telefono = pmtusu.telefono;
  $scope.correo = pmtusu.correo;
  $scope.estado = String(pmtusu.estado);
  $scope.options = options;
  $scope.close = function () {
    var resource = $resource(options.apiurl+'/duenio/piloto/' + piloto.idchofer, {}, {'update': {method:'PUT'}});
    resource.update({}, {
      nombre: $scope.nombre, apellidos: $scope.apellidos, dpi: String($scope.dpi),
      direccion: $scope.direccion, licencia: $scope.licencia, tipolicencia: $scope.tipolicencia,
      telefono: $scope.telefono, correo: $scope.correo,
      estado: parseInt($scope.estado), duenio: piloto.duenio
    }
  ).$promise.then(function(data) {
      $uibModalInstance.close(data, 500);
    }, function(error) {
        $uibModalInstance.dismiss('error');
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
