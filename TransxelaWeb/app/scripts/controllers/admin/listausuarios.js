'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:AdminListausuariosCtrl
 * @description
 * # AdminListausuariosCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('AdminListausuariosCtrl', [ '$scope', '$http', 'uiGridConstants','$cookies', '$location' , '$uibModal', '$resource', function ($scope, $http, uiGridConstants, $cookies, $location, $uibModal, $resource) {

    $scope.alertas = [];
    $scope.apiurl = 'http://127.0.0.1:8000';
    var resource = $resource($scope.apiurl+'/groups/');
    $scope.usuarios = resource.query(function(){
      var resource = $resource($scope.apiurl+'/users');
      var query = resource.query(function(){
        $scope.listado = query;
        $scope.gridOptions.data = $scope.listado;
        $scope.showDetalle($scope.gridOptions.data[0]);

      });


    },function(response){
      console.log(response);
    });

    $scope.mapearGrupo = function(idgrupo) {
      for(var i = 0; i < $scope.usuarios.length; i++) {
          if($scope.usuarios[i]["id"] === idgrupo) {
              return $scope.usuarios[i]["name"];
          }
      }
      return idgrupo;
    };

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
    $scope.showVerModificar = function (id) {
      var uibModalInstance = $uibModal.open({
        templateUrl: "views/admin/listausuariosmod.html",
        controller: "VerModificarCulturaController",
        resolve: {
          options: function () {
            return {"title": "Ver o modificar usuario", "buttom": "Modificar","apiurl": $scope.apiurl};
          },
          culturausu: function(){
            $scope.index = $scope.getIndexIfObjWithOwnAttr($scope.listado,"id", id);
            return $scope.listado[$scope.index];
          },
          usuarios: function() {
            return $scope.usuarios;
          }
        }
      });
      uibModalInstance.result.then(function (result) {
        $scope.listado[$scope.index] = result;
        $scope.alertas.push({"tipo":"success", "mensaje": "Usuario modificado exitosamente"});
      }, function () {
      });
    };
    // ----------------------------------- END VER MODIFICAR --------------------------------------------------------------



    // ----------------------------------- VER CREAR PMT --------------------------------------------------------------
    $scope.crearCultura = function () {
      var uibModalInstance = $uibModal.open({
        templateUrl: 'views/admin/listausuariosmod.html',
        controller:'crearCulturaController',
        resolve: {
          options: function () {
            return {"title": "Crear usuario", "buttom": "Crear","apiurl": $scope.apiurl};
          },
          usuarios: function() {
            return $scope.usuarios;
          },
          id: function () {
            return $scope.id;
          }
        }
      });
      uibModalInstance.result.then(function (result) {
        $scope.listado.push(result);
        $scope.alertas.push({"tipo":"success", "mensaje": "Usuario creado exitosamente"});
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

        {name: 'Nombre usuario', field: 'username', headerCellClass: $scope.highlightFilteredHeader },

        // {name: 'Grupo', field: 'groups', headerCellClass: $scope.highlightFilteredHeader },

        {name:'Grupo', field: 'groups[0]', cellTemplate: "<div>{{grid.appScope.mapearGrupo(row.entity.groups[0])}}</div>", enableFiltering: false},

        {name:'Descripcion',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idcultura)">Ver detalles</button></div>', enableFiltering: false}

      ]
    };

    //$scope.gridOptions.columnDefs[2].visible = false;

    $scope.toggleFiltering = function(){
      $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
      $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
    };

    $scope.showDetalle = function(culturausu) {
      $scope.mostrar = culturausu;
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


angular.module('transxelaWebApp').controller('crearCulturaController', ['$scope', '$http', '$uibModalInstance', 'options', 'usuarios', function ($scope, $http, $uibModalInstance, options, usuarios) {
  $scope.username = null;
  $scope.password = null;
  $scope.options = options;
  $scope.alertas = [];
  $scope.usuarios = usuarios;
  $scope.close = function () {
    console.log({
      username: $scope.username, password: $scope.password, groups: [parseInt($scope.user)]
    });
    var res = $http.post(options.apiurl+'/users/', {
      username: $scope.username, password: $scope.password, groups: [parseInt($scope.user)]
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


angular.module('transxelaWebApp').controller('VerModificarCulturaController', ['$scope', '$resource', '$uibModalInstance', 'options', 'culturausu', 'usuarios', function ($scope, $resource, $uibModalInstance, options, culturausu, usuarios) {
  $scope.fecha_nac = new Date("March 20, 2009 7:00:00");
  $scope.fecha_crea = new Date("March 20, 2009 7:00:00");
  $scope.nombre = culturausu.nombre;
  $scope.apellidos = culturausu.apellidos;
  $scope.empresa = culturausu.empresa;
  $scope.dpi = parseInt(culturausu.dpi);
  $scope.direccion = culturausu.direccion;
  $scope.telefono = culturausu.telefono;
  $scope.correo = culturausu.correo;
  $scope.estado = String(culturausu.estado);
  $scope.user = null;
  $scope.options = options;
  $scope.alertas = [];
  $scope.usuarios = usuarios;
  $scope.close = function () {
    var resource = $resource(options.apiurl+'/cultura/' + culturausu.id, {}, {'update': {method:'PUT'}});
    resource.update({}, {
      nombre: $scope.nombre, apellidos: $scope.apellidos,
      direccion: $scope.direccion, dpi:$scope.dpi,
      telefono: $scope.telefono, correo: $scope.correo,
      estado: parseInt($scope.estado), id: culturausu.id,
      usuario: parseInt($scope.user)
    }).$promise.then(function(data) {
      $uibModalInstance.close(data, 500);
    });
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
