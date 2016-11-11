'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:AdminCulturaCtrl
 * @description
 * # AdminCulturaCtrl
 * Controller of the transxelaWebApp
 */
 angular.module('transxelaWebApp')
   .controller('AdminCulturaCtrl', [ '$scope', '$http', 'uiGridConstants','$cookies', '$location' , '$uibModal', '$resource', function ($scope, $http, uiGridConstants, $cookies, $location, $uibModal, $resource) {

     $scope.alertas = [];
     $scope.apiurl = 'http://127.0.0.1:8000';
     var resource = $resource($scope.apiurl+'/cultura/sinusuario');
     var query = resource.query(function(){
       $scope.listado = query;
       $scope.gridOptions.data = $scope.listado;
       $scope.showDetalle($scope.gridOptions.data[0]);

     });
     $scope.mapearEstado = function(estado) {
       return estado ? 'Habilitado' : 'Deshabilitado';
     };

     $scope.getIndexIfObjWithOwnAttr = function(array, attr, value) {
       for(var i = 0; i < array.length; i++) {
         if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
           return i;
         }
       }
       return -1;
     };

     $scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
       if( col.filters[0].term ){
         return 'header-filtered';
       } else {
         return '';
       }
     };

     // ----------------------------------- VER MODIFICAR --------------------------------------------------------------
     $scope.showVerModificar = function (idcultura) {
       var uibModalInstance = $uibModal.open({
         templateUrl: "views/admin/culturasinusu.html",
         controller: "VerModificarCulturaController",
         resolve: {
           options: function () {
             return {"title": "Ver modificar persona de cultura", "buttom": "Modificar","apiurl": $scope.apiurl};
           },
           culturausu: function(){
             $scope.index = $scope.getIndexIfObjWithOwnAttr($scope.listado,"idcultura", idcultura);
             return $scope.listado[$scope.index];
           }
         }
       });
       uibModalInstance.result.then(function (result) {
         $scope.listado[$scope.index] = result;
         $scope.alertas.push({"tipo":"success", "mensaje": "Persona de cultura modificada exitosamente"});
       }, function () {
       });
     };
     // ----------------------------------- END VER MODIFICAR --------------------------------------------------------------



     // ----------------------------------- VER CREAR PMT --------------------------------------------------------------
     $scope.crearCultura = function () {
       var uibModalInstance = $uibModal.open({
         templateUrl: 'views/admin/culturasinusu.html',
         controller:'crearCulturaController',
         resolve: {
           options: function () {
             return {"title": "Crear persona dueño", "buttom": "Crear","apiurl": $scope.apiurl};
           },
           usuarios: function() {
             return $scope.usuarios;
           }
         }
       });
       uibModalInstance.result.then(function (result) {
         $scope.listado.push(result);
         $scope.alertas.push({"tipo":"success", "mensaje": "Persona de cultura creada exitosamente"});
       }, function () {
       });
     };
     // ----------------------------------- END CREAR PMT --------------------------------------------------------------


     $scope.gridOptions = {
       enableFiltering: true,
       showGridFooter: true,
       showColumnFooter: true,

       onRegisterApi: function(gridApi){
         $scope.gridApi = gridApi;
       },
       columnDefs: [

         {name: 'Nombre', field: 'nombre', headerCellClass: $scope.highlightFilteredHeader },

         {name: 'Apellidos', field: 'apellidos', headerCellClass: $scope.highlightFilteredHeader },



         {name: 'Estado', field: 'estado', cellTemplate: "<div>{{grid.appScope.mapearEstado(row.entity.estado)}}</div>",filter: {
             term: '1',
             type: uiGridConstants.filter.SELECT,
             selectOptions: [ { value: '1', label: 'Habilitado' }, { value: '0', label: 'Deshabilitado' }]
           },
           cellFilter: 'mapGender2', headerCellClass: $scope.highlightFilteredHeader },

           {name: 'Direccion', field: 'direccion', headerCellClass: $scope.highlightFilteredHeader },

           {name:'Descripcion',cellTemplate:'<div><button class="btn btn-info btn-sm" ng-click="grid.appScope.showVerModificar(row.entity.idcultura)">Ver detalles</button></div>', enableFiltering: false}

       ]
     };

     //$scope.gridOptions.columnDefs[2].visible = false;

     $scope.toggleFiltering = function(){
       $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
       $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
     };

     $scope.showDetalle = function(culturausu) {
       $scope.mostrar = culturausu;
     };


   }])


   .filter('mapGender2', function() {
   var genderHash2 = {
     1: '1',
     2: '0',
   };

   return function(input) {
     if (!input){
       return '';
     } else {
       return genderHash2[input];
     }
   };
 });


 angular.module('transxelaWebApp').controller('crearCulturaController', ['$scope', '$http', '$uibModalInstance', 'options', function ($scope, $http, $uibModalInstance, options) {
   $scope.nombre = null;
   $scope.apellidos = null;
   $scope.direccion = null;
   $scope.dpi = null;
   $scope.telefono = null;
   $scope.correo = null;
   $scope.estado = "1";
   $scope.options = options;
   $scope.alertas = [];
   $scope.close = function () {
     var res = $http.post(options.apiurl+'/cultura/', {
       nombre: $scope.nombre, apellidos: $scope.apellidos,
       dpi: String($scope.dpi), direccion: $scope.direccion,
       telefono: $scope.telefono, correo: $scope.correo,
       estado: parseInt($scope.estado)
     });
     res.success(function(data, status, headers, config) {
       $uibModalInstance.close(data, 500);
     });
     res.error(function(data, status, headers, config) {
       console.log(data);
     });
   };
   $scope.cancel = function () {
     $uibModalInstance.dismiss('cancel');
   };
 }]);


 angular.module('transxelaWebApp').controller('VerModificarCulturaController', ['$scope', '$resource', '$uibModalInstance', 'options', 'culturausu', function ($scope, $resource, $uibModalInstance, options, culturausu) {
   $scope.fecha_nac = new Date("March 20, 2009 7:00:00");
   $scope.fecha_crea = new Date("March 20, 2009 7:00:00");
   $scope.nombre = culturausu.nombre;
   $scope.apellidos = culturausu.apellidos;
   $scope.empresa = culturausu.empresa;
   $scope.dpi = parseInt(culturausu.dpi);
   $scope.direccion = culturausu.direccion;
   $scope.telefono = culturausu.telefono;
   $scope.correo = culturausu.correo;
   $scope.estado = String(culturausu.estado);
   $scope.options = options;
   $scope.alertas = [];
   $scope.close = function () {
     var resource = $resource(options.apiurl+'/cultura/' + culturausu.idcultura, {}, {'update': {method:'PUT'}});
     resource.update({}, {
       nombre: $scope.nombre, apellidos: $scope.apellidos,
       direccion: $scope.direccion, dpi:$scope.dpi, empresa: $scope.empresa,
       telefono: $scope.telefono, correo: $scope.correo,
       fecha_nac: $scope.fecha_nac, fecha_crea: $scope.fecha_crea,
       estado: parseInt($scope.estado), idcultura: culturausu.idcultura
     }).$promise.then(function(data) {
       $uibModalInstance.close(data, 500);
     });
   };
   $scope.cancel = function () {
     $uibModalInstance.dismiss('cancel');
   };
 }]);
