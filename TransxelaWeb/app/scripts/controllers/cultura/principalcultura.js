

'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:CulturaPrincipalCtrl
 * @description
 * # CulturaPrincipalCtrl
 * Controller of the transxelaWebApp
 */
 // Create an application module for our demo.
angular.module('transxelaWebApp').controller('PrincipalCulturaCtrl' ,function ($scope, $uibModal, $cookies, $location, apiService, uiGridConstants) {
  $scope.alertas = [];
  $scope.actividadesActivas=[];
//  $scope.apiurl = 'http://127.0.0.1:8000';
 $scope.usuario = $cookies.getObject('user').usuario;

   $scope.CrearNuevaAct = function () {
   var uibModalInstance = $uibModal.open({
    templateUrl: "views/cultura/nuevaactividadcultural.html",
    controller:"PopupCtrlActividades",
      resolve: {
        options: function () {
          return {"titleAct": "Crear Actividad", "boton" :"Crear", "token": $scope.token,"disabled":"true"};
        },
         idActividad: function(){
           return $scope.idActividad;
         }
      }
    });
      uibModalInstance.result.then(function (result) {
      $scope.actividades.push(result);
      $scope.alertas.push({"tipo":"success", "mensaje": "Actividad ingresada exitosamente"});
    }, function (status) {
        if(status==='403'){
            $location.url('/403');
        }
        else if(status==='404'){
            $location.url('/404');
        }
        else if(status==='500'){
            $location.url('/400');
        }
     console.log('Modal dismissed at: ' + new Date());
    });
  };




  $scope.showVerModificar = function (index) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/cultura/nuevaactividadcultural.html",
      controller: "VerModificarControllerCultura",
      resolve: {
        options: function () {
          return {"titleAct": "Modificar actividad", "boton": "Modificar","token": $scope.token ,"disabled":"false"};
        },
        act: function(){
          $scope.index=$scope.getIndexIfObjWithOwnAttr($scope.actividades,"idactividad", index);
          return $scope.actividades[$scope.index];
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.actividades[index] = result;
      $scope.alertas.push({"tipo":"success", "mensaje":"Actividad modificada exitosamente"});
    }, function (status) {
        if(status==='403'){
            $location.url('/403');
        }
        else if(status==='404'){
            $location.url('/404');
        }
        else if(status==='500'){
            $location.url('/400');
        }
     console.log('Modal dismissed at: ' + new Date());
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

    $scope.mapearEstado = function(estado){
        return estado ? 'Habilitado' :'Deshabilitado';
    };

    $scope.cerrar=function(){
      $cookies.remove('user');
      $location.url('/');
    };

    if(typeof $cookies.getObject('user') !== 'undefined' && $cookies.getObject('user')){
      $scope.idusuario = $cookies.getObject('user').id;
      $scope.token = $cookies.getObject('user').token;
      $scope.gridOptions = {};
      console.log($cookies.getObject('user').token);
      console.log("/cultura/actividad/?tk="+$scope.token);
      apiService.obtener("/cultura/actividad/?tk=" + $scope.token).
      success(function(response, status, headers, config){
        $scope.actividades = response;
        $scope.gridOptions.data=$scope.actividades;
        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.paginationPageSizes = [10, 25, 50];
        $scope.gridOptions.paginationPageSize = 10;
        $scope.gridOptions.columnDefs = [
              {name: 'Nombre actividad', field: 'nombre'},
              {name: 'Descripcion actividad', field:'descripcion'},
              {name: 'Fecha', field:'fecha'},
              {name: 'Direccion', field:'direccion'},
              {name: 'Lugar', field:'lugar'},
              {name: 'Estado', field:'estado', filter:{term:'true'}, visible:false},
              {name:' ',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idactividad)">Ver detalles</button></div>', enableFiltering: false}
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
    }
          else {
                 $location.url('/login');
          }


});



angular.module('transxelaWebApp').controller('PopupCtrlActividades', ['$scope','$http','$uibModalInstance','apiService','options','$window',function ($scope, $http, $uibModalInstance,apiService, options, $window) {

  console.log(options);
  $scope.nombre = null;
  $scope.descripcion = null;
  $scope.fecha = null;
  $scope.lugar = null;
  $scope.latitud = null;
  $scope.longitud = null;
  $scope.direccion= null;
  $scope.estado="true";
  $scope.options= options;

  $scope.close = function () {
  $scope.longitud=document.getElementById('longitud').value;
  $scope.latitud=document.getElementById('latitud').value;
        apiService.crear('/cultura/actividad/?tk='+ options.token, {
        nombre: $scope.nombre, descripcion: $scope.descripcion,
        fecha: $scope.fecha, lugar: $scope.lugar,
        latitud: $scope.latitud, longitud:$scope.longitud,
        direccion: $scope.direccion, estado: $scope.estado
    }).
      success(function(data, status, headers, config){
      $uibModalInstance.close(data,500);
    }).
      error(function(data, status, headers, config) {
          switch (status) {
            case 400:{
                  $uibModalInstance.dismiss('404');
                  break;
            }
            case 403:{
                  $uibModalInstance.dismiss('403');
                  break;
            }
            case 404:{
                  $uibModalInstance.dismiss('404');
                  break;
            }
            default:{
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
    };
    $scope.today = function() {
      $scope.fecha = new Date();

    };
    $scope.today();
    $scope.clear = function() {
      $scope.fecha = null;
    };
    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 0
    };
    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.fecha = new Date(year, month, day);

    };

    $scope.popup1 = {
      opened: false
    };




}]);


angular.module('transxelaWebApp').controller('VerModificarControllerCultura', ['$scope','$uibModalInstance','apiService','options','act',function ($scope, $uibModalInstance,apiService, options,act) {

      $scope.idactividad=act.idactividad;
      $scope.nombre = act.nombre;
      $scope.descripcion = act.descripcion;
      $scope.lugar = act.lugar;
      $scope.fecha = act.fecha;
      $scope.latitud = act.latitud;
      $scope.longitud = act.longitud;
      $scope.direccion=act.direccion;
      $scope.fecha=act.fecha;
      $scope.estado=act.estado;
      $scope.options= options;

      $scope.isSelected=function(){
          if($scope.estado==="true"){
             $scope.estado="true";
              console.log("No eliminar");
        }else{
            $scope.estado="false";
            console.log(" eliminar");
        }
      };

      $scope.close = function () {
      console.log($scope.estado);
      apiService.modificar('/cultura/actividad/'+$scope.idactividad+'/?tk=' + options.token, {
        nombre: $scope.nombre, descripcion: $scope.descripcion,
        fecha: $scope.fecha, lugar: $scope.lugar,
        latitud: $scope.latitud, longitud:$scope.longitud,
        direccion: $scope.direccion, estado: $scope.estado
        }).
        success(function (response, status, headers,config) {
          $uibModalInstance.close(response,500);
        }).
        error(function (response,status,headers,config) {
          switch (status) {
            case 400:{
                $uibModalInstance.dismiss('404');
                break;
            }
            case 403:{
                $uibModalInstance.dismiss('403');
                break;
            }
            case 404:{
                $uibModalInstance.dismiss('404');
                break;
            }
            default:{
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
        };
        $scope.today = function() {
          $scope.fecha = new Date();

        };
        $scope.today();
        $scope.clear = function() {
          $scope.fecha = null;
        };
        $scope.dateOptions = {
          formatYear: 'yy',
          maxDate: new Date(2020, 5, 22),
          minDate: new Date(),
          startingDay: 0
        };
        $scope.open1 = function() {
          $scope.popup1.opened = true;
        };

        $scope.setDate = function(year, month, day) {
          $scope.fecha = new Date(year, month, day);

        };

        $scope.popup1 = {
          opened: false
        };


}]);
