'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:AdminUsuarioscrudCtrl
 * @description
 * # AdminUsuarioscrudCtrl
 * Controller of the transxelaWebApp
 */

angular.module('transxelaWebApp').controller('AdminUsuarioscrudCtrl', function($scope, $resource, $uibModal, $location) {
  $scope.alertas = [];
  $scope.apiurl = 'http://127.0.0.1:8000';
  $scope.idusuario = 0;
  $scope.showCrear = function () {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/admin/usuariocrud.html',
      controller:'CrearUsuarioController',
      resolve: {
        options: function () {
          return {"title": "Crear Usuario", "buttom": "Crear", "apiurl": $scope.apiurl};
        },
        idusuario: function () {
          return $scope.idusuario;
        }
      }
    });
    uibModalInstance.result.then(function (result) {
      $scope.usuarios.push(result);
      $scope.alertas.push({"tipo":"success", "mensaje": "Usuario creado exitosamente"});
    }, function (status) {
      // if(status === 'error'){
      //   $location.url('/404');
      // }
    });
  };

  $scope.showVerModificar = function (idusuar) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/admin/usuariocrud.html",
      controller: "ModificarUsController",
      resolve: {
        options: function () {
          return {"title": "Ver Usuario", "buttom": "Modificar", "apiurl": $scope.apiurl};
        },
        usuario: function(){
          $scope.index = $scope.getIndexIfObjWithOwnAttr($scope.usuarios,"idusuar", idusuar);
          return $scope.usuarios[$scope.index];
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.usuarios[$scope.index] = result;
      $scope.alertas.push({"tipo":"success", "mensaje": "Usuario modificado exitosamente"});
    }, function (status) {
      // if(status === 'error'){
      //   $location.url('/404');
      // }
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

  $scope.gridOptions = {
    enableFiltering: true,
    showGridFooter: true,
    showColumnFooter: true,
  };
  var resource = $resource($scope.apiurl+'/users/');
  var query = resource.query(function(){

    $scope.usuarios = query;
    $scope.gridOptions.data = $scope.usuarios;
    $scope.gridOptions.enableFiltering = true;
    $scope.gridOptions.columnDefs = [
      {name:'Nombre',field:'nombre'},
      {name:'Apellidos',field:'apellidos'},
      {name:'direccion',field:'direccion'},
      {name:'DPI',field:'dpi'},
      {name:'Tipo Usuario',field:'tipousuario'},
      {name:'Telefono',field:'telefono'},
      {name:'Correo',field:'correo'},
      {name:'Estado',field:'estado', cellTemplate: "<div>{{grid.appScope.mapearEstado(row.entity.estado)}}</div>", enableFiltering: false},
      {name:' ',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idusuar)">Ver detalles</button></div>', enableFiltering: false}
      ];
    }

  //   function(response) {
  //     $location.url('/404');
  // }
);

  $scope.mapearEstado = function(estado) {
    return estado ? 'Habilitado' : 'Deshabilitado';
  };

});

angular.module('transxelaWebApp').controller('CrearUsuarioController', ['$scope', '$http', '$uibModalInstance','options', 'idusuario', function ($scope, $http, $uibModalInstance, options, idusuario) {
  $scope.nombre = null;
  $scope.apellidos = null;
  $scope.dpi = null;
  $scope.direccion = null;
  $scope.tipousuario = null;
  $scope.telefono = null;
  $scope.correo = null;
  $scope.estado = "1";
  $scope.options = options;
  $scope.close = function () {
    var res = $http.post(options.apiurl+'/admin/usuariocrud/', {
      nombre: $scope.nombre, apellidos: $scope.apellidos,
      dpi: String($scope.dpi), direccion: $scope.direccion,
      tipousuario: $scope.tipousuario,
      telefono: $scope.telefono, correo: $scope.correo,
      estado: parseInt($scope.estado), duenio: idusuario
    });
    res.success(function(data, status, headers, config) {
      $uibModalInstance.close(data, 500);
    });
    // res.error(function(data, status, headers, config) {
    //   $uibModalInstance.dismiss('error');
    // });
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);

angular.module('transxelaWebApp').controller('ModificarUsController', ['$scope', '$resource', '$uibModalInstance', 'options', 'usuario', function ($scope, $resource, $uibModalInstance, options, usuario) {
  $scope.nombre = usuario.nombre;
  $scope.apellidos = usuario.apellidos;
  $scope.dpi = parseInt(usuario.dpi);
  $scope.direccion = usuario.direccion;
  $scope.tipousuario = usuario.tipousuario;
  $scope.telefono = usuario.telefono;
  $scope.correo = usuario.correo;
  $scope.estado = String(usuario.estado);
  $scope.options = options;
  $scope.close = function () {
    var resource = $resource(options.apiurl+'/admin/usuariocrud/' + usuario.idusuar, {}, {'update': {method:'PUT'}});
    resource.update({}, {
      nombre: $scope.nombre, apellidos: $scope.apellidos, dpi: String($scope.dpi),
      direccion: $scope.direccion, tipousuario: $scope.tipousuario,
      telefono: $scope.telefono, correo: $scope.correo,
      estado: parseInt($scope.estado), duenio: usuario.duenio
    }).$promise.then(function(data) {
      $uibModalInstance.close(data, 500);
    }
    // , function(error) {
    //     $uibModalInstance.dismiss('error');
    // }
  );
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
