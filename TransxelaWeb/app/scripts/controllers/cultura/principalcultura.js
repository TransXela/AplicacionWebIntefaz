'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:CulturaPrincipalCtrl
 * @description
 * # CulturaPrincipalCtrl
 * Controller of the transxelaWebApp
 */
 // Create an application module for our demo.
angular.module('transxelaWebApp').controller('PopupDemoCont' ,function ($scope, $uibModal) {
  $scope.alertas = [];
  $scope.apiurl = 'http://127.0.0.1:8000';
  $scope.idActividad=1;
  $scope.alertas=[];


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


$scope.CrearNuevaAct = function () {
   var uibModalInstance = $uibModal.open({
    templateUrl: 'views/cultura/nuevaactividadcultural.html',
    controller:'PopupCont',
      resolve: {
        options: function () {
          return {"titleAct": "Crear Actividad", "boton" :"Crear", "apiurl": $scope.apiurl};
        },
         idActividad:function(){
           return $scope.idActividad;
         }
      }
    });




      uibModalInstance.result.then(function (result) {
      console.log("entro");
      $scope.actividades.push(result);
      $scope.alertas.push({"tipo":"success", "mensaje": "Actividad ingresada exitosamente"});
    }, function () {
     console.log('Modal dismissed at: ' + new Date());
    });

  };

  $scope.showVerModificar = function (index) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/cultura/nuevaactividadcultural.html",
      controller: "VerModificarAController",
      resolve: {
        options: function () {
          return {"title": "Ver actividad", "boton": "Modificar"};
        },
        act: function(){
          return $scope.actividades[index];
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.actividades[index] = result;
    }, function () {
     console.log('Modal dismissed at: ' + new Date());
    });
  };

  $scope.gridOptions = {
           data: $scope.actividades,
           enableFiltering :true,
           columnDefs:[
             {name:'Nombre',field:'NombreActividad'},
             {name:'Lugar',field:'LugarActividad'},
             {name:' ',cellTemplate:'<div><button ng-click="grid.appScope.showVerModificar(rowRenderIndex)">Ver detalles</button></div>', enableFiltering: false}
           ]
     };

});



angular.module('transxelaWebApp').controller('PopupCont', ['$scope','$http','$uibModalInstance','options',function ($scope, $http, $uibModalInstance, options) {
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
