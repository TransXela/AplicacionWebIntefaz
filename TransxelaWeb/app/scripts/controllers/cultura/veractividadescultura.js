
angular.module('transxelaWebApp')
  .controller('VerActividadesCtrl', function ($scope, $resource, $http) {
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
        {name: 'Lugar', field:'lugar'}


      ];
  });

  });
