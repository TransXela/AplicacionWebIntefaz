

'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:CulturaPrincipalCtrl
 * @description
 * # CulturaPrincipalCtrl
 * Controller of the transxelaWebApp
 */
 // Create an application module for our demo.
angular.module('transxelaWebApp').controller('PrincipalCulturaCtrl' ,function ($scope, $uibModal, $resource, $http) {
  $scope.alertas = [];
  $scope.apiurl = 'http://127.0.0.1:8000';
  $scope.idActividad=1;
  $scope.alertas=[];




$scope.CrearNuevaAct = function () {
   var uibModalInstance = $uibModal.open({
    templateUrl: 'views/cultura/nuevaactividadcultural.html',
    controller:'PopupCtrlActividades',
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
      $scope.actividades.push(result);
      $scope.alertas.push({"tipo":"success", "mensaje": "Actividad ingresada exitosamente"});
    }, function () {
     console.log('Modal dismissed at: ' + new Date());
    });

  };




  $scope.showVerModificar = function (index) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/cultura/modificaractividadcultural.html",
      controller: "VerModificarControllerCultura",
      resolve: {
        options: function () {
          return {"title": "Ver actividad", "boton": "Modificar","apiurl": $scope.apiurl};
        },
        act: function(){
          $scope.index=$scope.getIndexIfObjWithOwnAttr($scope.actividades,"idactividad", index);
          return $scope.actividades[$scope.index];
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.actividades[index] = result;
    }, function () {
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

  $scope.gridOptions={};

var actividades = $http.get('http://127.0.0.1:8000/cultura/actividad/');
    actividades.then(function(result) {
    $scope.actividades = result.data;
    $scope.gridOptions.data=$scope.actividades;
    console.log($scope.actividades);
    $scope.gridOptions.enableFiltering=true;
    $scope.gridOptions.columnDefs=[
      {name: 'Nombre actividad', field: 'nombre'},
      {name: 'Descripcion actividad', field:'descripcion'},
      {name: 'Fecha', field:'fecha'},
      {name: 'Direccion', field:'direccion'},
      {name: 'Lugar', field:'lugar'},
      {name:' ',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idactividad)">Ver detalles</button></div>', enableFiltering: false}

    ];
});
});



angular.module('transxelaWebApp').controller('PopupCtrlActividades', ['$scope','$http','$uibModalInstance','options','$window',function ($scope, $http, $uibModalInstance, options, $window) {
  $scope.longitud;

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


angular.module('transxelaWebApp').controller('VerModificarControllerCultura', ['$scope','$uibModalInstance','options','act',function ($scope, $uibModalInstance, options,act) {
  console.log("entro");
  console.log(act.nombre);
  $scope.nombre = act.nombre;
  $scope.descripcion = act.descripcion;
  $scope.lugar = act.lugar;
  $scope.fecha = act.fecha;
  $scope.latitud = act.latitud;
  $scope.longitud = act.longitud;
  $scope.direccion=act.direccion;
  $scope.options= options;
$scope.close = function () {
  $uibModalInstance.close({

    nombre: $scope.nombre,
    description: $scope.descripcion,
    lugar: $scope.lugar,
    fecha: $scope.fecha,
    latitud: $scope.latitud,
    longitud: $scope.longitud

  }, 500);
};
$scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
};
}]);
