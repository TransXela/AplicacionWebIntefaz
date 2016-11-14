

'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:CulturaPrincipalCtrl
 * @description
 * # CulturaPrincipalCtrl
 * Controller of the transxelaWebApp
 */
 // Create an application module for our demo.
angular.module('transxelaWebApp').controller('PrincipalConsejoCtrl' ,function ($scope, $uibModal, $resource,$http) {
  $scope.alertas = [];
  $scope.apiurl = 'http://127.0.0.1:8000';
  $scope.idConsejo=1;
  $scope.alertas=[];




$scope.CrearNuevoConsejo = function () {
   var uibModalInstance = $uibModal.open({
    templateUrl: 'views/cultura/nuevoconsejo.html',
    controller:'PopupContConsejo',
    resolve: {
      options: function () {
            return {"titleAct": "Crear Consejo", "boton" :"Crear", "apiurl": $scope.apiurl};
        },
         idConsejo:function(){
           return $scope.idConsejo;
         }
      }
    });






      uibModalInstance.result.then(function (result) {
      console.log("entro");
      $scope.Consejos.push(result);
      $scope.alertas.push({"tipo":"success", "mensaje": "Consejo Cargado exitosamente"});
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });

  };





  $scope.showVerModificar = function (index) {
  var uibModalInstance = $uibModal.open({
      templateUrl: "views/cultura/nuevoconsejo.html",
      controller: "VerModificarAController",
      resolve: {
        options: function () {
          return {"title": "Ver Consejo", "boton": "Modificar"};
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

      $scope.gridOptions={};
      $scope.names={};
      var Consejos= $http.get('http://127.0.0.1:8000/cultura/consejodeldia/');
      Consejos.then(function(result){

        $scope.Consejos=result.data;
        $scope.names= $scope.Consejos;
          console.log($scope.names);
    });
});



angular.module('transxelaWebApp').controller('PopupContConsejo', ['$scope','$http','$uibModalInstance','options',function ($scope, $http, $uibModalInstance, options) {
  console.log($scope.NombreActividad);
  $scope.consejo=null;
  $scope.options=options;
  $scope.close = function () {
  console.log({
        consejo: $scope.consejo
  });
  var res= $http.post(options.apiurl+'/cultura/consejodeldia/', {
        consejo :$scope.consejo
        });
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
