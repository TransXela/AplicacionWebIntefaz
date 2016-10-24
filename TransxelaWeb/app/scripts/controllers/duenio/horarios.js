'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioHorariosCtrl
 * @description
 * # DuenioHorariosCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioHorariosCtrl', function($scope, $resource, $uibModal, $location, $cookies) {
  $scope.idduenio = $cookies.getObject('user').id;
  $scope.alertas = [];
  //$scope.apiurl = 'http://127.0.0.1:8000';
  $scope.apiurl = 'http://'+ $cookies.getObject('user').apiurl +':8000';
  $scope.showCrear = function (size) {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/duenio/horario.html',
      controller:'CrearHController',
      size: size,
      resolve: {
        options: function () {
          return {"title": "Crear Horario", "button": "Crear", "apiurl": $scope.apiurl};
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
      if(status === 'error'){
        $location.url('/404');
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
          return {"title": "Ver Horario", "button": "Modificar", "apiurl": $scope.apiurl};
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
      else if(status ==='notdeleted'){
       $scope.alertas.push({"tipo":"danger", "mensaje": "Imposible eliminar el horario"});
      }
      else if(status === 'error'){
          $location.url('/404');
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

  $scope.gridOptions = {};
  var resource = $resource($scope.apiurl+'/duenio/'+$scope.idduenio+'/horarios');
  $scope.horarios = resource.query(function(){
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
    $scope.gridOptions.columnDefs = [
      {name:'Hora inicio',field:'horainicio', cellFilter: 'date:\'hh:mm a\''},
      {name:'Hora fin',field:'horafin', cellFilter: 'date:\'hh:mm a\''},
      {name:' ',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idhorario, \'sm\')">Ver detalles</button></div>'}
      ];
  }, function(response) {
    $location.url('/404');
  });
});

angular.module('transxelaWebApp').controller('CrearHController', ['$scope', '$http','$uibModalInstance', 'options', 'idduenio', function ($scope, $http, $uibModalInstance, options, idduenio) {
  $scope.horainicio = new Date("March 20, 2009 7:00:00");
  $scope.horafin = new Date("March 20, 2009 8:00:00");
  $scope.options = options;
  $scope.alertas = [];
  $scope.close = function () {
    var res = $http.post(options.apiurl+'/duenio/horario/', {horainicio: $scope.formatoTime($scope.horainicio), horafin: $scope.formatoTime($scope.horafin),
        duenio: idduenio});
    res.success(function(data, status, headers, config) {
      $uibModalInstance.close({horainicio: $scope.horainicio, horafin: $scope.horafin,
        duenio: idduenio, idhorario: data.idhorario}, 500);
    });
    res.error(function(response, status, headers, config) {
      if(response != null && response.crear != null) {
        $scope.alertas.push({"tipo":"warning", "mensaje": response.crear.estado});
      }
      else{
        $uibModalInstance.dismiss('error');
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

angular.module('transxelaWebApp').controller('VerModificarHController', ['$scope', '$resource','$uibModalInstance', 'options', 'horario', function ($scope, $resource, $uibModalInstance, options, horario) {
  $scope.horainicio = horario.horainicio;
  $scope.horafin = horario.horafin;
  $scope.options = options;
  $scope.alertas = [];
  $scope.close = function () {
    var resource = $resource(options.apiurl+'/duenio/horario/' + horario.idhorario, {}, {'update': {method:'PUT'}});
    resource.update({},{horainicio: $scope.formatoTime($scope.horainicio), horafin: $scope.formatoTime($scope.horafin),
        duenio: horario.duenio}).$promise.then(function(data) {
      $uibModalInstance.close({
        horainicio: $scope.horainicio,
        horafin: $scope.horafin
      }, 500);
    }, function(response) {
        if(response != null && response.data != null) {
          $scope.alertas.push({"tipo":"warning", "mensaje": response.data.modificar.estado});
        }
        else{
          $uibModalInstance.dismiss('error');
        }
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.delete = function () {
    var resource = $resource(options.apiurl+'/duenio/horario/' + horario.idhorario);
    resource.delete().$promise.then(function() {
      $uibModalInstance.dismiss('success');
    }, function(response) {
      if(response != null && response.data != null) {
        $uibModalInstance.dismiss('notdeleted');
      }
      else{
        $uibModalInstance.dismiss('error');
      }
    });
  };

  $scope.formatoTime = function(fecha){
    fecha = new Date(fecha);
    return fecha.getHours() + ":" + fecha.getMinutes();
  }
}]);
