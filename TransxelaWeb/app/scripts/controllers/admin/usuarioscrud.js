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
        if(status === '403'){
          $location.url('/403');
        }
        else if(status === '404'){
          $location.url('/404');
        }
        else if(status === '500'){
          $location.url('/400');
        }
    }
  );
  };

  $scope.showVerModificar = function (id) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/admin/usuariocrud.html",
      controller: "ModificarUsController",
      resolve: {
        options: function () {
          return {"title": "Ver Usuario", "buttom": "Modificar", "token": $scope.token};
        },
        usuario: function(){
          $scope.index = $scope.getIndexIfObjWithOwnAttr($scope.usuarios,"id", id);
          return $scope.usuarios[$scope.index];
        },
        grupos: function () {
          return $scope.grupos;
        }
      },
    });
    uibModalInstance.result.then(function (result) {
      $scope.usuarios[$scope.index] = result;
      $scope.alertas.push({"tipo":"success", "mensaje": "Usuario modificado exitosamente"});
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
    }
  );
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

  if(typeof $cookies.getObject('user') !== 'undefined' && $cookies.getObject('user')){
    $scope.token = $cookies.getObject('user').token;
    apiService.obtener('/groups/?tk=' + $scope.token).
    success(function(response, status, headers, config){
      $scope.grupos = response;
      $scope.filtrogrupos = [];
      for(var i = 0; i<$scope.grupos.length; i++){
        $scope.filtrogrupos.push({value: $scope.grupos[i].id, label: $scope.grupos[i].name});
      }
      apiService.obtener('/users/?tk=' + $scope.token).
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
          {name:' ',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.id)">Ver detalles</button></div>', enableFiltering: false}
        ];

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

  $scope.mapearEstado = function(estado) {
    return estado ? 'Habilitado' : 'Deshabilitado';
  };
  $scope.cerrar = function(){
    $cookies.remove('user');
    $location.url('/');
  };
});

angular.module('transxelaWebApp').controller('CrearUsuarioController', ['$scope', 'apiService', '$uibModalInstance','options', 'grupos', function ($scope, apiService, $uibModalInstance, options, grupos) {
  $scope.nombre = null;
  $scope.correo = null;
  $scope.contrasenia = null;
  $scope.grupo = null;
  $scope.estado = true;
  $scope.is_staff = false;
  $scope.is_superuser = false;
  $scope.alertas = [];
  $scope.options = options;
  $scope.grupos = grupos;
  $scope.close = function () {

      if ($scope.mapearGrupo($scope.grupo) === 'Admin') {
        $scope.is_staff = true;
        $scope.is_superuser = true;
      }
    apiService.crear('/users/?tk=' + options.token, {
      username: $scope.nombre,
      idgroup: parseInt($scope.grupo),
      email: $scope.correo,
      password: $scope.contrasenia,
      is_active: parseInt($scope.estado),
      is_staff: $scope.is_staff,
      is_superuser: $scope.is_superuser
    })
    .success(function(data, status, headers, config) {
      $uibModalInstance.close(data, 500);
    })
    .error(function(data, status, headers, config) {
      switch(status) {
        case 400: {
          if (data.hasOwnProperty('username')) {
            $scope.alertas.push({"tipo":"warning", "mensaje": data.username[0]});
          }else {
            $uibModalInstance.dismiss('404');
          }

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

  $scope.mapearGrupo = function(idgrupo) {
    for(var i = 0; i < $scope.grupos.length; i++) {
      if($scope.grupos[i]["id"] === idgrupo) {
          return $scope.grupos[i]["name"];
      }
    }
    return idgrupo;
  };
}]);

angular.module('transxelaWebApp').controller('ModificarUsController', ['$scope', '$resource', '$uibModalInstance', 'options', 'usuario', 'apiService', 'grupos', function ($scope, $resource, $uibModalInstance, options, usuario, apiService, grupos) {
  if (usuario.is_active === true) {
    $scope.estado = "1";
  } else {
    $scope.estado = "0";
  };
  $scope.nombre = usuario.username;
  $scope.correo = usuario.email;
  $scope.contrasenia = usuario.password;
  $scope.grupo = String(usuario.groups[0]);
  $scope.is_staff = usuario.is_staff;
  $scope.is_superuser = usuario.is_superuser;
  $scope.alertas = [];
  $scope.options = options;
  $scope.grupos = grupos;
  console.log($scope.estado);
  $scope.close = function () {

    if ($scope.mapearGrupo($scope.grupo) === 'Admin') {
      $scope.is_staff = true;
      $scope.is_superuser = true;
    }

    apiService.modificar('/users/' + usuario.id + '/?tk=' + options.token, {

      username: $scope.nombre,
      groups: [parseInt($scope.grupo)],
      email: $scope.correo,
      password: $scope.contrasenia,
      is_active: parseInt($scope.estado),
      is_staff: $scope.is_staff,
      is_superuser: $scope.is_superuser,
      id: usuario.id
    }).
    success(function(response, status, headers, config){
      $uibModalInstance.close(response, 500);
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
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.mapearGrupo = function(idgrupo) {
    for(var i = 0; i < $scope.grupos.length; i++) {
      if($scope.grupos[i]["id"] === idgrupo) {
          return $scope.grupos[i]["name"];
      }
    }
    return idgrupo;
  };
}]);
