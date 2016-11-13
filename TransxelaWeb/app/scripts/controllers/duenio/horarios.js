'use strict';

/**
* @ngdoc function
* @name transxelaWebApp.controller:DuenioHorariosCtrl
* @description
* # DuenioHorariosCtrl
* Controller of the transxelaWebApp
*/
angular.module('transxelaWebApp').controller('DuenioHorariosCtrl', function($scope, apiService, $uibModal, $location, $cookies, uiGridConstants) {
  $scope.alertas = [];
  $scope.showCrear = function (size) {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/duenio/horario.html',
      controller:'CrearHController',
      size: size,
      resolve: {
        options: function () {
          return {"title": "Nuevo horario", "button": "Crear horario", "token": $scope.token};
        },
        idduenio: function () {
          return $scope.idduenio;
        }
      }
    });
    uibModalInstance.result.then(function (result) {
      $scope.horarios.push(result);
      $scope.alertas.push({"tipo":"success", "mensaje": "Horario creado exitosamente"});
    }, function (status) {
      if(status === '403'){
        $location.url('/403');
      }
      else if(status === '500'){
        $location.url('/400');
      }
    });
  };

  $scope.showVerModificar = function (idhorario, size) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/duenio/horario.html",
      controller: "VerModificarHController",
      size: size,
      resolve: {
        options: function () {
          return {"title": "Información del horario", "button": "Guardar cambios", "token": $scope.token};
        },
        horario: function(){
          $scope.index = $scope.getIndexIfObjWithOwnAttr($scope.horarios,"idhorario", idhorario);
          return $scope.horarios[$scope.index];
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.horarios[$scope.index].horainicio = result.horainicio;
      $scope.horarios[$scope.index].horafin = result.horafin;
      $scope.alertas.push({"tipo":"success", "mensaje": "Horario modificado exitosamente"});
    }, function (status) {
      if(status ==='success'){
        $scope.horarios.splice($scope.index,1);
        $scope.alertas.push({"tipo":"success", "mensaje": "Horario eliminado exitosamente"});
      }
      else if(status === '403'){
        $location.url('/403');
      }
      else if(status === '500'){
        $location.url('/400');
      }
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

  $scope.cerrar = function(){
    $cookies.remove('user');
      $location.url('/');
  };

  if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
    $scope.idduenio = $cookies.getObject('user').id;
    $scope.token = $cookies.getObject('user').token;
    $scope.duenio = $cookies.getObject('user').usuario;
    $scope.gridOptions = {};
    apiService.obtener('/duenio/'+$scope.idduenio+'/horarios'+'?tk='+$scope.token).
    success(function(response, status, headers, config) {
      $scope.horarios = response;
      $scope.nuevaHora = new Date("March 20, 2009 19:00:00");
      for (var i=0; i<$scope.horarios.length; i++) {
        $scope.hora_minutosI = $scope.horarios[i].horainicio.split(":");
        $scope.hora_minutosF = $scope.horarios[i].horafin.split(":");
        $scope.horarios[i].horainicio = $scope.nuevaHora.setHours($scope.hora_minutosI[0]);
        $scope.horarios[i].horainicio = $scope.nuevaHora.setMinutes($scope.hora_minutosI[1]);
        $scope.horarios[i].horafin = $scope.nuevaHora.setHours($scope.hora_minutosF[0]);
        $scope.horarios[i].horafin = $scope.nuevaHora.setMinutes($scope.hora_minutosF[1]);
      }
      $scope.gridOptions.data = $scope.horarios;
      $scope.gridOptions.paginationPageSizes = [10, 25, 50];
      $scope.gridOptions.paginationPageSize = 10;
      $scope.gridOptions.columnDefs = [
        {name:'Hora inicio',field:'horainicio', cellFilter: 'date:\'hh:mm a\'', sort: { direction: uiGridConstants.ASC }},
        {name:'Hora fin',field:'horafin', cellFilter: 'date:\'hh:mm a\''},
        {name:' ',cellTemplate:'<div class="wrapper text-center"><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idhorario)">Ver más</button></div>'}
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
  else{
    $location.url('/login');
  }
});

angular.module('transxelaWebApp').controller('CrearHController', ['$scope', 'apiService','$uibModalInstance', 'options', 'idduenio', function ($scope, apiService, $uibModalInstance, options, idduenio) {
  $scope.horainicio = new Date("March 20, 2009 7:00:00");
  $scope.horafin = new Date("March 20, 2009 8:00:00");
  $scope.options = options;
  $scope.alertas = [];
  $scope.close = function () {
    apiService.crear('/duenio/horario/?tk=' + options.token, {horainicio: $scope.formatoTime($scope.horainicio), horafin: $scope.formatoTime($scope.horafin), duenio: idduenio}).
    success(function(data, status, headers, config) {
      $uibModalInstance.close({horainicio: $scope.horainicio, horafin: $scope.horafin, duenio: idduenio, idhorario: data.idhorario}, 500);
    }).
    error(function(response, status, headers, config) {
      switch(status) {
        case 400: {
          $scope.alertas.push({"tipo":"warning", "mensaje": response.crear.estado});
          break;
        }
        case 403: {
          $uibModalInstance.dismiss('403');
          break;
        }
        case 404: {
          $scope.alertas.push({"tipo":"warning", "mensaje": response.crear.estado});
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

  $scope.formatoTime = function(fecha){
    fecha = new Date(fecha);
    return fecha.getHours() + ":" + fecha.getMinutes();
  }
}]);

angular.module('transxelaWebApp').controller('VerModificarHController', ['$scope', 'apiService','$uibModalInstance', 'options', 'horario', function ($scope, apiService, $uibModalInstance, options, horario) {
  $scope.horainicio = horario.horainicio;
  $scope.horafin = horario.horafin;
  $scope.options = options;
  $scope.alertas = [];
  $scope.close = function () {
    apiService.modificar('/duenio/horario/' + horario.idhorario + '/?tk=' + options.token, {horainicio: $scope.formatoTime($scope.horainicio), horafin: $scope.formatoTime($scope.horafin), duenio: horario.duenio}).
    success(function(data, status, headers, config) {
      $uibModalInstance.close({
        horainicio: $scope.horainicio,
        horafin: $scope.horafin
      }, 500);
    }).
    error(function(response, status, headers, config) {
      switch(status) {
        case 400: {
          $scope.alertas.push({"tipo":"warning", "mensaje": response.modificar.estado});
          break;
        }
        case 403: {
          $uibModalInstance.dismiss('403');
          break;
        }
        case 404: {
          $scope.alertas.push({"tipo":"warning", "mensaje": response.modificar.estado});
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

  $scope.delete = function () {
    apiService.borrar('/duenio/horario/' + horario.idhorario + '/?tk=' + options.token).
    success(function(response, status, headers, config){
      $uibModalInstance.dismiss('success');
    }).
    error(function(response, status, headers, config) {
      switch(status) {
        case 400: {
          $scope.alertas.push({"tipo":"danger", "mensaje": response.estado});
          break;
        }
        case 403: {
          $uibModalInstance.dismiss('403');
          break;
        }
        case 404: {
          $scope.alertas.push({"tipo":"danger", "mensaje": response.estado});
          break;
        }
        default: {
          $uibModalInstance.dismiss('500');
        }
      }
    });
  };

  $scope.formatoTime = function(fecha){
    fecha = new Date(fecha);
    return fecha.getHours() + ":" + fecha.getMinutes();
  }
}]);
