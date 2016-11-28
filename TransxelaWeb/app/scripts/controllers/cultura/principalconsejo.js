

'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:CulturaPrincipalCtrl
 * @description
 * # CulturaPrincipalCtrl
 * Controller of the transxelaWebApp
 */
 // Create an application module for our demo.
angular.module('transxelaWebApp').controller('PrincipalConsejoCtrl' ,function ($scope, $uibModal, $resource,$http, apiService, $location, $cookies, uiGridConstants) {
  $scope.alertas = [];
  $scope.idConsejo=1;
  $scope.alertas=[];




$scope.CrearNuevoConsejo = function () {
   var uibModalInstance = $uibModal.open({
    templateUrl: 'views/cultura/nuevoconsejo.html',
    controller:'PopupContConsejo',
    resolve: {
      options: function () {
            return {"titleAct": "Crear Consejo", "boton" :"Crear", "token": $scope.token};
        },
         idConsejo:function(){
           return $scope.idConsejo;
         }
      }
    });
      uibModalInstance.result.then(function (result) {
      $scope.Consejos.push(result);
      $scope.alertas.push({"tipo":"success", "mensaje": "Consejo Cargado exitosamente"});
      }, function (status) {
          if (status==='403') {
            $location.url('/403');
          }
          else if (status==='404'){
            $location.url('/404');
          }
          else if (status==='500'){
            $location.url('/400');
          }
        console.log('Modal dismissed at: ' + new Date());
      });
  };

  $scope.asignarfecha = function () {
     var uibModalInstance = $uibModal.open({
      templateUrl: 'views/cultura/asignarfechaconsejo.html',
      controller:'PopupAsignarFecha',
      resolve: {
        options: function () {
              return {"titleAct": "Asignar Fecha", "boton" :"Asignar", "token": $scope.token};
          },
           idConsejo:function(){
             return $scope.idConsejo;
           }
        }
      });
        uibModalInstance.result.then(function (result) {
        $scope.Consejos.push(result);
        $scope.alertas.push({"tipo":"success", "mensaje": "Consejo Cargado exitosamente"});
        }, function (status) {
            if (status==='403') {
              $location.url('/403');
            }
            else if (status==='404'){
              $location.url('/404');
            }
            else if (status==='500'){
              $location.url('/400');
            }
          console.log('Modal dismissed at: ' + new Date());
        });
    };


    $scope.getIndexIfObjWithOwnAttr=function(array, attr,value){
      for(var i=0; i< array.length; i++){
        if(array[i].hasOwnProperty(attr)&& array[i][attr]===value){
            return i;
        }
      }
        return -1;
    };

  $scope.mapearEstado=function(estado){
    return estado ? 'Habilitado' : 'Deshabilitado';
  };

  $scope.cerrar=function(){
      $cookies.remove('user');
      $location.url('/');
  };


  $scope.showVerModificar = function (index) {
  var uibModalInstance = $uibModal.open({
      templateUrl: "views/cultura/nuevoconsejo.html",
      controller: "VerModificarAController",
      resolve: {
        options: function () {
          return {"title": "Ver Consejo", "boton": "Modificar","token": $scope.token};
        },
        act: function(){
          return $scope.actividades[index];
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

      $scope.names={};
      if(typeof $cookies.getObject('user') !== 'undefined' && $cookies.getObject('user')){
        $scope.idusuario = $cookies.getObject('user').id;
        $scope.token = $cookies.getObject('user').token;
        $scope.gridOptions = {};
        console.log($cookies.getObject('user').token);
        console.log("/cultura/consejodeldia/?tk="+$scope.token);
        apiService.obtener("/cultura/consejodeldia/?tk=" + $scope.token).
        success(function(response, status, headers, config){
          $scope.Consejos = response;
            $scope.names=$scope.Consejos;

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


            if(typeof $cookies.getObject('user') !== 'undefined' && $cookies.getObject('user')){
              $scope.idusuario = $cookies.getObject('user').id;
              $scope.token = $cookies.getObject('user').token;
              $scope.gridOptions = {};
              console.log($cookies.getObject('user').token);
              console.log("/cultura/consejofe/?tk="+$scope.token);
              apiService.obtener("/cultura/consejodeldia/?tk=" + $scope.token).
              success(function(response, status, headers, config){
                $scope.Consejos = response;
                  $scope.names=$scope.Consejos;

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



angular.module('transxelaWebApp').controller('PopupContConsejo', ['$scope','$http','$uibModalInstance','apiService','options',function ($scope, $http, $uibModalInstance,apiService, options) {
  console.log($scope.NombreActividad);
  $scope.consejo=null;
  $scope.options=options;
  $scope.close = function () {
        apiService.crear('/cultura/consejodeldia/?tk='+ options.token, {
        consejo: $scope.consejo
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


}]);

angular.module('transxelaWebApp').controller('PopupAsignarFecha', ['$scope','$http','$uibModalInstance','apiService','options',function ($scope, $http, $uibModalInstance,apiService, options) {
  $scope.consejo=null;
  $scope.options=options;
  $scope.close = function () {
        apiService.crear('/cultura/consejodeldia/?tk='+ options.token, {
        consejo: $scope.consejo
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


angular.module('transxelaWebApp').controller('PopupContFecha', ['$scope','$http','$uibModalInstance','options',function ($scope, $http, $uibModalInstance, options) {
    console.log($scope.NombreActividad);
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
  console.log({
        nombre: $scope.nombre, descripcion: $scope.descripcion,
        fecha: $scope.fecha, lugar: $scope.lugar,
        latitud: $scope.latitud, longitud:$scope.longitud,
        direccion: $scope.direccion, estado: $scope.estado
  } );
  var res= $http.post(options.apiurl+'/cultura/actividad/', {
        nombre: $scope.nombre, descripcion: $scope.descripcion,
        fecha: $scope.fecha, lugar: $scope.lugar,
        latitud: $scope.latitud, longitud:$scope.longitud,
        direccion: $scope.direccion, estado: $scope.estado
  }  );
    res.success(function(data, status, headers, config){
      $uibModalInstance.close(data,500);
    });
    res.error(function(data, status, headers, config) {
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




angular.module('transxelaWebApp').controller('VerModificarAController', ['$scope','$uibModalInstance','options','act',function ($scope, $uibModalInstance, options,act) {
  $scope.NombreActividad = act.NombreActividad;
  $scope.DescripcionActividad = act.DescripcionActividad;
  $scope.LugarActividad = act.LugarActividad;
  $scope.DateActividad = act.DateActividad;
  $scope.LatActividad = act.LatActividad;
  $scope.LngActividad = act.LngActividad;
  $scope.options= options;
$scope.close = function () {
  $uibModalInstance.close({

    NombreActividad: $scope.NombreActividad,
    DescripcionActividad: $scope.DescripcionActividad,
    LugarActividad: $scope.LugarActividad,
    DateActividad: $scope.DateActividad,
    LatActividad: $scope.LatActividad,
    LngActividad: $scope.LngActividad,

  }, 500);
};
    $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
    };
}]);
