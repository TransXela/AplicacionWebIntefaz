'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioHorariosCtrl
 * @description
 * # DuenioHorariosCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioHorariosCtrl', function($scope, $uibModal) {
  $scope.horarios = [{"horainicio": new Date("October 09, 2016 10:00:00"), "horafin": new Date("October 09, 2016 11:30:00")}];
  $scope.showCrear = function (size) {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/duenio/horario.html',
      controller:'CrearHController',
      size: size,
      resolve: {
        options: function () {
          return {"title": "Crear Horario", "button": "Crear"};
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.horarios.push(result);
    }, function () {
     console.log('Modal dismissed at: ' + new Date());
    });
  };

  $scope.showVerModificar = function (index, size) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/duenio/horario.html",
      controller: "VerModificarHController",
      size: size,
      resolve: {
        options: function () {
          return {"title": "Ver Horario", "button": "Modificar"};
        },
        horario: function(){
          return $scope.horarios[index];
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.horarios[index] = result;
    }, function () {
     console.log('Modal dismissed at: ' + new Date());
    });
  };

  $scope.gridOptions = {
    data: $scope.horarios,
    columnDefs:[
      {name:'Hora inicio',field:'horainicio', cellFilter: 'date:\'hh:mm a\''},
      {name:'Hora fin',field:'horafin', cellFilter: 'date:\'hh:mm a\''},
      {name:' ',cellTemplate:'<div><button ng-click="grid.appScope.showVerModificar(rowRenderIndex, \'sm\')">Ver detalles</button></div>'}
      ]
  };
});

angular.module('transxelaWebApp').controller('CrearHController', ['$scope', '$uibModalInstance', 'options', function ($scope, $uibModalInstance, options) {
  $scope.horainicio = new Date();
  $scope.horafin = new Date();
  $scope.options = options;
  $scope.close = function () {
    $uibModalInstance.close({
      horainicio: $scope.horainicio,
      horafin: $scope.horafin
    }, 500);
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);

angular.module('transxelaWebApp').controller('VerModificarHController', ['$scope', '$uibModalInstance', 'options', 'horario', function ($scope, $uibModalInstance, options, horario) {
  $scope.horainicio = horario.horainicio;
  $scope.horafin = horario.horafin;
  $scope.options = options;
  $scope.close = function () {
    $uibModalInstance.close({
      horainicio: $scope.horainicio,
      horafin: $scope.horafin
    }, 500);
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);