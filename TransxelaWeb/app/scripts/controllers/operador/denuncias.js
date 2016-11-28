'use strict';

/**
* @ngdoc function
* @name transxelaWebApp.controller:OperadorDenunciasCtrl
* @description
* # OperadorDenunciasCtrl
* Controller of the transxelaWebApp
*/
angular.module('transxelaWebApp').controller('OperadorDenunciasCtrl', function ($scope, apiService, $cookies, $location, uiGridConstants, $templateCache, $uibModal) {
  $scope.formatoFecha = function(fecha){
    return fecha.getFullYear() + "-" + (fecha.getMonth()+1) + "-" + fecha.getDate();
  };

  $scope.buscar = function(){
    if($scope.fecha<=$scope.fechafin){
      $scope.gridOptions = {};
      apiService.obtener('/webdenuncias/rango/?tk='+$scope.token+"&fInicio="+$scope.formatoFecha($scope.fecha)+"&fFin="+$scope.formatoFecha($scope.fechafin)).
      success(function(response, status, headers, config) {
        $scope.denuncias = response.denuncias;
        $scope.gridOptions.data = $scope.denuncias;
        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.enableRowSelection = true;
        $scope.gridOptions.enableSelectAll = true;
        // $scope.gridOptions.showGridFooter = true;
        $scope.gridOptions.paginationPageSizes = [10, 25, 50];
        $scope.gridOptions.paginationPageSize = 10;
        $scope.gridOptions.columnDefs = [
          {name:'Fecha',field:'denuncia.fechahora', cellFilter: 'date:\'dd/MM/yy hh:mm a\'', sort: { direction: uiGridConstants.DESC }, enableFiltering: false},
          {name:'Bus',field:'denuncia.placa',
          filter: {type: uiGridConstants.filter.STARTS_WITH, placeholder: 'Placa del bus', headerCellClass: $scope.highlightFilteredHeader}},
          {name:'Tipo denuncia',field:'tipodenuncia[0].descripcion',
            filter: {type: uiGridConstants.filter.STARTS_WITH, placeholder: 'Tipo denuncia', headerCellClass: $scope.highlightFilteredHeader}},
          {name:'Estado', field: 'denuncia.estado', cellTemplate: "<div>{{grid.appScope.mapearEstado(row.entity.denuncia.estado)}}</div>",
            filter: {/*term: '1', */type: uiGridConstants.filter.SELECT,
            selectOptions: $scope.filtroestado}, headerCellClass: $scope.highlightFilteredHeader},
          {name:' ',cellTemplate:'<div class="wrapper text-center"><button class="btn btn-default btn-sm" ng-click="grid.appScope.showTD(row.entity.idtipoDenuncia)"><i class="fa fa-map-marker"></i></button><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.denuncia.iddenuncia)">Ver +</button></div>', enableFiltering: false}
        ];
        if(response.numdenuncias === 0){
          $scope.alertas.push({"tipo":"success", "mensaje": "No existen denuncias en el rango seleccionado.", "icono": "glyphicon glyphicon-ok"});
        }
        else{
          $scope.alertas = [];
        }
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
      $scope.alertas.push({"tipo":"warning", "mensaje": "El rango seleccionado no es correcto.", "icono": "glyphicon glyphicon-ok", "icono": "glyphicon glyphicon-exclamation-sign"});
    }
  };

  $scope.mapearEstado = function(estado) {
    for(var i = 0; i < $scope.estados.length; i++) {
      if($scope.estados[i]["id"] === estado) {
          return $scope.estados[i]["definicion"];
      }
    }
    return estado;
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

  if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
    $scope.fecha = new Date();
    $scope.fechafin = new Date();
    $scope.token = $cookies.getObject('user').token;
    $scope.usuario = $cookies.getObject('user').usuario;
    $scope.estadoCambiar = null;
    $scope.estados = [{ "id": 1,"definicion": "En proceso"}, { "id": 2,"definicion": "Pendiente de verificación"}, { "id": 3,"definicion": "Aceptada"}];
    $scope.alertas = [];
    $scope.filtroestado = [];
    for(var i = 0; i<$scope.estados.length; i++){
      $scope.addFiltroEstado($scope.estados[i].id);
    }
    $scope.buscar();
  }
  else{
    $location.url('/login');
  }

  $scope.showVerModificar = function (iddenuncia) {
    var uibModalInstance = $uibModal.open({
      templateUrl: "views/operador/denuncia.html",
      controller: "ModificarController",
      resolve: {
        options: function () {
          return {"title": "Información de la denuncia", "token": $scope.token, "estados": $scope.estados};
        },
        denuncia: function(){
          $scope.index = $scope.getIndexIfObjWithOwnAttr($scope.denuncias,"denuncia", iddenuncia);
          return $scope.denuncias[$scope.index];
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      $scope.denuncias[$scope.index].denuncia.estado = result.estado;
      $scope.alertas.push({"tipo":"success", "mensaje": "Denuncia modificada exitosamente", "icono": "glyphicon glyphicon-ok"});
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

  $scope.getIndexIfObjWithOwnAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].hasOwnProperty(attr) && array[i][attr].iddenuncia === value) {
            return i;
        }
    }
    return -1;
  };

  $scope.cerrar = function(){
    $cookies.remove('user');
    $location.url('/');
  };

  $scope.denunciasRutas = function(){
    $location.url('/operador/denunciasrutas');
  };

  $scope.cambiarEstadoDenuncias = function(){
    if($scope.estadoCambiar != null){
      if($scope.gridApi.selection.getSelectedCount()>0){
        var cambiarEDenuncias = $scope.gridApi.selection.getSelectedRows();
        var listadenuncias = [];
        for(var iterator = 0; iterator < cambiarEDenuncias.length; iterator++){
          listadenuncias.push(cambiarEDenuncias[iterator].denuncia.iddenuncia);
        }
        apiService.modificar('/denuncias/cambiarestados/?tk=' + $scope.token, {
          estado: parseInt($scope.estadoCambiar), denuncias: listadenuncias
        }).
        success(function(response, status, headers, config){
          for(var iterator = 0; iterator < cambiarEDenuncias.length; iterator++){
            cambiarEDenuncias[iterator].denuncia.estado = parseInt($scope.estadoCambiar);
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

  $scope.dateOptions = {
    formatYear: 'yy',
    //maxDate: new Date(),
    //minDate: new Date(),
    startingDay: 0
  };

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };
});

angular.module('transxelaWebApp').controller('ModificarController', ['$scope', 'apiService', '$uibModalInstance', 'options', 'denuncia', function ($scope, apiService, $uibModalInstance, options, denuncia) {
  $scope.placa = denuncia.denuncia.placa;
  if(denuncia.chofer.length > 0) {
    $scope.piloto = denuncia.chofer[0].nombre + ' ' + denuncia.chofer[0].apellidos + ' ' + denuncia.chofer[0].dpi;
  }
  else {
    $scope.piloto = 'No se cuenta con la información del piloto.'
  }
  $scope.fecha = denuncia.denuncia.fechahora;
  $scope.tipodenuncia = denuncia.tipodenuncia[0].descripcion;
  $scope.estado = String(denuncia.denuncia.estado);
  $scope.estados = options.estados;
  $scope.options = options;
  $scope.close = function () {
    apiService.modificar('/denuncia/estado/' + denuncia.denuncia.iddenuncia + '/?tk=' + options.token, {
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
