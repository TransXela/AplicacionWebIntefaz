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
      $scope.gridOptions.columnDefs = [
        {name:'Fecha',field:'fechahora', cellFilter: 'date:\'hh:mm a dd-MM-yy\'', sort: { direction: uiGridConstants.DESC }, enableFiltering: false},
        {name:'Bus',field:'placa'},
        {name:'Estado', field:'estado', cellTemplate: "<div>{{grid.appScope.mapearEstado(row.entity.estado)}}</div>",
        filter: {/*term: '1', */type: uiGridConstants.filter.SELECT,
        selectOptions: [ { value: '1', label: 'Aceptada' }, { value: '2', label: 'Inválida' }, { value: '3', label: 'En proceso' }]}, headerCellClass: $scope.highlightFilteredHeader},
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
          return {"title": "Información de la denuncia", "token": $scope.token, "tipodenuncia": $scope.tipodenuncia};
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
    switch(estado){
      case 1: {
        return "Aceptada";
      }
      case 2: {
        return "Inválida";
      }
      case 3: {
        return "En proceso";
      }
      default: {
        return "Desconocido";
      }
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
  // Set Bootstrap DatePickerPopup config
  $scope.datePicker = {

    options: {
      formatMonth: 'MM',
      startingDay: 1
    },
    format: "yyyy-MM-dd"
  };

  // Set two filters, one for the 'Greater than' filter and other for the 'Less than' filter
  $scope.showDatePopup = [];
  $scope.showDatePopup.push({ opened: false });
  $scope.showDatePopup.push({ opened: false });
  $templateCache.put('ui-grid/date-cell', "<div class='ui-grid-cell-contents'>{{COL_FIELD | date:'yyyy-MM-dd'}}</div>");

  // Custom template using Bootstrap DatePickerPopup
  $templateCache.put('ui-grid/ui-grid-date-filter',
  "<div class=\"ui-grid-filter-container\" ng-repeat=\"colFilter in col.filters\" >" +
  "<input type=\"text\" uib-datepicker-popup=\"{{datePicker.format}}\" " +
  "datepicker-options=\"datePicker.options\" " +
  "datepicker-append-to-body=\"true\" show-button-bar=\"false\"" +
  "is-open=\"showDatePopup[$index].opened\" class=\"ui-grid-filter-input ui-grid-filter-input-{{$index}}\"" +
  "style=\"font-size:1em; width:11em!important\" ng-model=\"colFilter.term\" ng-attr-placeholder=\"{{colFilter.placeholder || ''}}\" " +
  " aria-label=\"{{colFilter.ariaLabel || aria.defaultFilterLabel}}\" />" +
  "<span style=\"padding-left:0.3em;\"><button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"showDatePopup[$index].opened = true\">" +
  "<i class=\"glyphicon glyphicon-calendar\"></i></button></span>" +
  "<div role=\"button\" class=\"ui-grid-filter-button\" ng-click=\"removeFilter(colFilter, $index)\" ng-if=\"!colFilter.disableCancelFilterButton\" ng-disabled=\"colFilter.term === undefined || colFilter.term === null || colFilter.term === ''\" ng-show=\"colFilter.term !== undefined && colFilter.term !== null && colFilter.term !== ''\">" +
  "<i class=\"ui-grid-icon-cancel\" ui-grid-one-bind-aria-label=\"aria.removeFilter\">&nbsp;</i></div></div><div ng-if=\"colFilter.type === 'select'\"><select class=\"ui-grid-filter-select ui-grid-filter-input-{{$index}}\" ng-model=\"colFilter.term\" ng-attr-placeholder=\"{{colFilter.placeholder || aria.defaultFilterLabel}}\" aria-label=\"{{colFilter.ariaLabel || ''}}\" ng-options=\"option.value as option.label for option in colFilter.selectOptions\"><option value=\"\"></option></select><div role=\"button\" class=\"ui-grid-filter-button-select\" ng-click=\"removeFilter(colFilter, $index)\" ng-if=\"!colFilter.disableCancelFilterButton\" ng-disabled=\"colFilter.term === undefined || colFilter.term === null || colFilter.term === ''\" ng-show=\"colFilter.term !== undefined && colFilter.term != null\"><i class=\"ui-grid-icon-cancel\" ui-grid-one-bind-aria-label=\"aria.removeFilter\">&nbsp;</i></div></div>"
  );

});

angular.module('transxelaWebApp').controller('MController', ['$scope', 'apiService', '$uibModalInstance', 'options', 'denuncia', function ($scope, apiService, $uibModalInstance, options, denuncia) {
  $scope.placa = denuncia.placa;
  $scope.piloto = 'No se cuenta con la información del piloto.'
  $scope.fecha = new Date(denuncia.fechahora);
  $scope.fecha = $scope.fecha.getDate() + "/" + ($scope.fecha.getMonth()+1) + '/' + $scope.fecha.getFullYear();
  $scope.tipodenuncia = options.tipodenuncia.descripcion;
  $scope.estado = String(denuncia.estado);
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
