'use strict';

/**
* @ngdoc function
* @name transxelaWebApp.controller:AdminUsuarioscrudCtrl
* @description
* # AdminUsuarioscrudCtrl
* Controller of the transxelaWebApp
*/

angular.module('transxelaWebApp').controller('AdminUsuarioscrudCtrl', function($scope, apiService, $uibModal, $location, $cookies, uiGridConstants) {


    // ------------------- PANTALLA STEPS ----------------------------------------------------------------------------------------------------



    // ------------------- END PANTALLA STEPS ----------------------------------------------------------------------------------------------------



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
      apiService.obtener('/obtenerusuariosgrupos/?tk=' + $scope.token).
      success(function(response, status, headers, config){
        $scope.duenio = response[0];
        $scope.pmt = response[1];
        $scope.cultura = response[2];
        $scope.admin = response[3];



        $scope.usuarios = $scope.duenio.concat($scope.pmt, $scope.cultura);
        console.log($scope.usuarios);
        $scope.gridOptions.data = $scope.usuarios;
        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.columnDefs = [

            {name:'Usuario',field:'nombre'},
            {name:'Correo',field:'correo'},
            {name:'Tipo usuarios',field:'usuario.groups[0].name'},
            {name:'Estado',field:'estado', cellTemplate: "<div>{{grid.appScope.mapearEstado(row.entity.is_active)}}</div>", enableFiltering: false},
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
  $scope.hab = 1;
  $scope.usuario = null;
  $scope.correo = null;
  $scope.contrasenia = null;
  $scope.grupo = null;
  $scope.estado = "1";

  $scope.nombre = null;
 	$scope.apellidos = null;
 	$scope.direccion = null;
 	$scope.empresa = null;
 	$scope.fecha_nac ="2016-11-11T00:00:00Z";
 	$scope.fecha_crea = "2016-11-16T00:00:00Z";
 	$scope.dpi = null;
 	$scope.telefono = null;
 	$scope.foto = null;



  $scope.alertas = [];
  $scope.options = options;
  $scope.grupos = grupos;
  $scope.close = function () {






    apiService.crear('/crearusuariopersona/?tk=' + options.token, {
      nombre : $scope.nombre,
    	apellidos : $scope.apellidos,
    	direccion : $scope.direccion,
    	empresa : $scope.empresa,
    	fecha_nac : $scope.fecha_nac,
    	fecha_crea : $scope.fecha_crea,
    	dpi : $scope.dpi,
    	telefono : $scope.telefono,
    	foto : $scope.foto ,
    	estado : $scope.estado,

      username: $scope.usuario,
      idgroup: parseInt($scope.grupo),
      email: $scope.correo,
      password: $scope.contrasenia
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

angular.module('transxelaWebApp').controller('ModificarUsController', ['$scope', '$resource', '$uibModalInstance', 'options', 'usuario', 'apiService', 'grupos', '$location', function ($scope, $resource, $uibModalInstance, options, usuario, apiService, grupos, $location) {
  if (usuario.is_active === true) {
    $scope.estado = "1";
  } else {
    $scope.estado = "0";
  };
  $scope.nombre = usuario.username;
  $scope.correo = usuario.email;
  $scope.contrasenia = null;
  $scope.grupo = String(usuario.groups[0]);
  $scope.is_staff = usuario.is_staff;
  $scope.is_superuser = usuario.is_superuser;
  $scope.alertas = [];
  $scope.options = options;
  $scope.grupos = grupos;
  $scope.close = function () {

    if ($scope.mapearGrupo($scope.grupo) === 'Admin') {
      $scope.is_staff = true;
      $scope.is_superuser = true;
    }else {
      $scope.is_staff = false;
      $scope.is_superuser = false;
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
  $scope.cambiar = function () {
    apiService.modificar('/users/cambiarcontrasenia/' + usuario.id + '/?tk=' + options.token, {

      password: $scope.contrasenia,

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
  $scope.mapearGrupo = function(idgrupo) {
    for(var i = 0; i < $scope.grupos.length; i++) {
      if($scope.grupos[i]["id"] === idgrupo) {
          return $scope.grupos[i]["name"];
      }
    }
    return idgrupo;
  };
}]);
