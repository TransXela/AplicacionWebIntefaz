'use strict';

/**
* @ngdoc function
* @name transxelaWebApp.controller:OperadorDenunciastipoCtrl
* @description
* # OperadorDenunciastipoCtrl
* Controller of the transxelaWebApp
*/
angular.module('transxelaWebApp').controller('OperadorDenunciastipoCtrl', function ($scope, apiService, $cookies, $location, uiGridConstants, $templateCache, $uibModal) {
  if(typeof $cookies.getObject('user') !== 'undefined' && $cookies.getObject('user')){
    $scope.token = $cookies.getObject('user').token;
    $scope.usuario = $cookies.getObject('user').usuario;
    $scope.idbus = $cookies.get('idbus');
    $scope.idtipo = $cookies.get('idtipo');
    $scope.alertas = [];
    $scope.estados = [{ "id": 1,"definicion": "En proceso"}, { "id": 2,"definicion": "Pendiente de verificación"}, { "id": 3,"definicion": "Aceptada"}];
    $scope.gridOptions = {};
    apiService.obtener('/denuncias/ruta/bus/'+$scope.idbus+'/'+$scope.idtipo+'/?tk='+$scope.token).
    success(function(response, status, headers, config) {
      $scope.denuncias = response[1].denuncias;
      $scope.bus = {"placa": $scope.denuncias[0].placa};
      $scope.tipodenuncia = response[0].tipodenuncia[0];
      $scope.gridOptions.data = $scope.denuncias;
      $scope.gridOptions.enableFiltering = true;
      $scope.gridOptions.enableRowSelection = true;
      $scope.gridOptions.enableSelectAll = true;
      // $scope.gridOptions.showGridFooter = true;
      $scope.filtroestado = [];
      for(var i = 0; i<$scope.estados.length; i++){
        $scope.addFiltroEstado($scope.estados[i].id);
      }
      $scope.gridOptions.columnDefs = [
        {name:'Fecha',field:'fechahora', cellFilter: 'date:\'hh:mm a dd-MM-yy\'', sort: { direction: uiGridConstants.DESC }, enableFiltering: false},
        {name:'Bus',field:'placa'},
        {name:'Estado', field:'estado', cellTemplate: "<div>{{grid.appScope.mapearEstado(row.entity.estado)}}</div>",
        filter: {/*term: '1', */type: uiGridConstants.filter.SELECT,
        selectOptions: $scope.filtroestado}, headerCellClass: $scope.highlightFilteredHeader},
        {name:' ',cellTemplate:'<div class="wrapper text-center"><button class="btn btn-default btn-sm" ng-click="grid.appScope.showTD(row.entity.idtipoDenuncia)"><i class="fa fa-map-marker"></i></button><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.iddenuncia)">Ver +</button></div>', enableFiltering: false}
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

  $scope.showVerModificar = function (iddenuncia) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/operador/denuncia.html",
      controller: "MController",
      resolve: {
        options: function () {
          return {"title": "Información de la denuncia", "token": $scope.token, "tipodenuncia": $scope.tipodenuncia, "estados": $scope.estados};
        },
        denuncia: function(){
          $scope.index = $scope.getIndexIfObjWithOwnAttr($scope.denuncias,"iddenuncia", iddenuncia);
          return $scope.denuncias[$scope.index];
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.denuncias[$scope.index].estado = result.estado;
      $scope.alertas.push({"tipo":"success", "mensaje": "Denuncia modificada exitosamente"});
    },
    function (status) {
      if(status === '403'){
        $location.url('/403');
      }
      else if(status === '404'){
        $location.url('/404');
      }
      else if(status === '500'){
        $location.url('/500');
      }
    });
  };

  $scope.mapearEstado = function(estado) {
    for(var i = 0; i < $scope.estados.length; i++) {
      if($scope.estados[i]["id"] === estado) {
          return $scope.estados[i]["definicion"];
      }
    }
    return estado;
  };

  $scope.cambiarEstadoDenuncias = function(){
    if($scope.estadoCambiar != null){
      if($scope.gridApi.selection.getSelectedCount()>0){
        var cambiarEDenuncias = $scope.gridApi.selection.getSelectedRows();
        var listadenuncias = [];
        for(var iterator = 0; iterator < cambiarEDenuncias.length; iterator++){
          listadenuncias.push(cambiarEDenuncias[iterator].iddenuncia);
        }
        apiService.modificar('/denuncias/cambiarestados/?tk=' + $scope.token, {
          estado: parseInt($scope.estadoCambiar), denuncias: listadenuncias
        }).
        success(function(response, status, headers, config){
          for(var iterator = 0; iterator < cambiarEDenuncias.length; iterator++){
            cambiarEDenuncias[iterator].estado = parseInt($scope.estadoCambiar);
          }
          $scope.alertas.push({"tipo":"success", "mensaje": "Estado de la/s denuncia/s se ha/n actualizado exitosamente.", "icono": "glyphicon glyphicon-ok"});
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
        $scope.alertas.push({"tipo":"warning", "mensaje": "Las denuncias deben seleccionarse para realizar acciones sobre ellas. No se han modificado denuncias.", "icono": "glyphicon glyphicon-exclamation-sign"});
      }
    }
    else{
      $scope.alertas.push({"tipo":"warning", "mensaje": "Debe seleccionar un estado para poder cambiar las denuncias. No se han modificado denuncias.", "icono": "glyphicon glyphicon-exclamation-sign"});
    }
  };

  $scope.gridOptions.onRegisterApi = function(gridApi){
    //set gridApi on scope
    $scope.gridApi = gridApi;
  };

  $scope.addFiltroEstado = function(id){
    var nueva = true;
    for(var i = 0; i<$scope.filtroestado.length; i++){
      if($scope.filtroestado[i].value === id){
        nueva = false;
        break;
      }
    }
    if(nueva){
      $scope.filtroestado.push({value: id, label: $scope.mapearEstado(id)});
    }
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
    $cookies.remove('idruta');
    $cookies.remove('idbus');
    $cookies.remove('idtipo');
    $location.url('/');
  };
});

angular.module('transxelaWebApp').controller('MController', ['$scope', 'apiService', '$uibModalInstance', 'options', 'denuncia', function ($scope, apiService, $uibModalInstance, options, denuncia) {
  $scope.placa = denuncia.placa;
  $scope.piloto = 'No se cuenta con la información del piloto.'
  $scope.fecha = new Date(denuncia.fechahora);
  $scope.fecha = $scope.fecha.getDate() + "/" + ($scope.fecha.getMonth()+1) + '/' + $scope.fecha.getFullYear();
  $scope.tipodenuncia = options.tipodenuncia.descripcion;
  $scope.estado = String(denuncia.estado);
  $scope.estados = options.estados;
  $scope.options = options;
  $scope.close = function () {
    apiService.modificar('/denuncia/estado/' + denuncia.iddenuncia + '/?tk=' + options.token, {
      estado: parseInt($scope.estado)
    }).
    success(function(response, status, headers, config){
      $uibModalInstance.close( {
        estado: parseInt($scope.estado)
      }, 500);
    }).
    error(function(response, status, headers, config) {
      switch(status) {
        case 400: {
          $uibModalInstance.dismiss('404');
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
}]);
