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
 $scope.actividades=[{
   "idActividad":1,
   "NombreActividad": "Sinfonica nacional",
   "DescripcionActividad":"la Sinfonica nacional se presenta",
   "LugarActividad" : "Teatro municipal",
   "DateActividad" :"12/12/12",
   "LatActividad": "-34.397",
   "LngActividad": "150.644",
   "Estado": 1
 },
 {
   "idActividad":1,
   "NombreActividad": "ballet nacional",
  "DescripcionActividad":"el ballet nacional se presenta",
   "LugarActividad" : "Teatro municipal",
   "DateActividad" :"11/12/15",
   "LatActividad": "-34.397",
   "LngActividad": "150.644",
   "Estado": 1
 }];

$scope.CrearNuevaAct = function () {
   var uibModalInstance = $uibModal.open({
    templateUrl: 'views/cultura/nuevaactividadcultural.html',
    controller:'PopupCont',
      resolve: {
        options: function () {
          return {"titleAct": "Crear Actividad", "boton" :"Crear"};
        }
      }
    });




    uibModalInstance.result.then(function (result) {
      console.log("entro");
      $scope.actividades.push(result);
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



angular.module('transxelaWebApp').controller('PopupCont', ['$scope','$uibModalInstance','options',function ($scope, $uibModalInstance, options) {
  console.log($scope.NombreActividad);
  $scope.NombreActividad = null;
  $scope.DescripcionActividad = null;
  $scope.LugarActividad = null;
  $scope.DateActividad = null;
  $scope.LatActividad = null;
  $scope.LngActividad = null;
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
