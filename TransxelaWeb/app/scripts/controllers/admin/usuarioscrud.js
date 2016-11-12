'use strict';

/**
* @ngdoc function
* @name transxelaWebApp.controller:AdminUsuarioscrudCtrl
* @description
* # AdminUsuarioscrudCtrl
* Controller of the transxelaWebApp
*/

angular.module('transxelaWebApp').controller('AdminUsuarioscrudCtrl', function($scope, apiService, $uibModal, $location, $cookies, uiGridConstants) {
  $scope.alertas = [];
  $scope.apiurl = 'http://127.0.0.1:8000';
  $scope.idusuario = 0;
  $scope.showCrear = function () {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/admin/usuariocrud.html',
      controller:'CrearUsuarioController',
      resolve: {
        options: function () {
          return {"title": "Crear Usuario", "buttom": "Crear", "token": $scope.token};
        },
        grupos: function () {
          return $scope.grupos;
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

  $scope.mapearGrupo = function(idgrupo) {
    for(var i = 0; i < $scope.grupos.length; i++) {
      if($scope.grupos[i]["id"] === idgrupo) {
          return $scope.grupos[i]["name"];
      }
    }
    return idgrupo;
  };
  $scope.gridOptions = {
    enableFiltering: true,
    showGridFooter: true,
    showColumnFooter: true,
  };

  if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
    $scope.token = $cookies.getObject('user').token;
    apiService.obtener('/groups/' + $scope.token).
    success(function(response, status, headers, config){
      $scope.grupos = response;
      $scope.filtrogrupos = [];
      for(var i = 0; i<$scope.grupos.length; i++){
        $scope.filtrogrupos.push({value: $scope.grupos[i].id, label: $scope.grupos[i].name});
      }
      apiService.obtener('/users/' + $scope.token).
      success(function(response, status, headers, config){
        $scope.usuarios = response;
        $scope.gridOptions.data = $scope.usuarios;
        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.columnDefs = [
          {name:'Usuario',field:'username'},
          {name:'Correo',field:'email'},
          {name:'Tipo usuario', field: 'groups[0]', cellTemplate: "<div>{{grid.appScope.mapearGrupo(row.entity.groups[0])}}</div>",
            filter: {/*term: '1', */type: uiGridConstants.filter.SELECT,
            selectOptions: $scope.filtrogrupos}, headerCellClass: $scope.highlightFilteredHeader},
          {name:'Estado',field:'is_active', cellTemplate: "<div>{{grid.appScope.mapearEstado(row.entity.is_active)}}</div>", enableFiltering: false},
          {name:' ',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idusuar)">Ver detalles</button></div>', enableFiltering: false}
        ];
      }).
      error(function(response, status, headers, config) {
      });
      }).
      error(function(response, status, headers, config) {
      });
    }
    else{
      $location.url('/login');
    }

  $scope.mapearEstado = function(estado) {
    return estado ? 'Habilitado' : 'Deshabilitado';
  };

});

angular.module('transxelaWebApp').controller('CrearUsuarioController', ['$scope', 'apiService', '$uibModalInstance','options', 'grupos', function ($scope, apiService, $uibModalInstance, options, grupos) {
  $scope.nombre = null;
  $scope.correo = null;
  $scope.contrasenia = null;
  $scope.grupo = null;
  $scope.estado = true;
  $scope.is_staff = true;
  $scope.options = options;
  $scope.grupos = grupos;
  $scope.close = function () {
    apiService.crear('/user/' + options.token + '/', {
      // if ($scope.grupo === 4) {
      //   is_staff: $scope.is_staff;
      // },
      username: $scope.nombre,
      groups: [parseInt( $scope.grupo)],
      email: $scope.correo,
      password: $scope.contrasenia,
      is_active: $scope.estado
    })
    .success(function(data, status, headers, config) {
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
