'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:PmtPrincipalCtrl
 * @description
 * # PmtPrincipalCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
//muestra la cantidad de denuncias hacia un bus (no placa)
  .controller('PmtPrincipalCtrl', function ($scope, $http) {
    $scope.Lplaca = [];
    $scope.Ldenun = [];
    $http.get("http://127.0.0.1:8000/duenio/bus")
    .success(function(data){
        console.log(data);
        $scope.bus = data;
        $http.get("http://127.0.0.1:8000/reporte/pmt/RepDuenioBusD/")
        .success(function(data){
          $scope.denunc = data;
          $scope.res = [];
          console.log(data);
          for (var i = 0; i < $scope.bus.length; i++) {
            $scope.resultado = 0;
            for (var j = 0; j< $scope.denunc.length; j++) {
              if ($scope.denunc[j].placa === $scope.bus[i].placa) {
                $scope.resultado = $scope.resultado + 1;
              }
              if($scope.resultado > 0){
                $scope.res[i]={plac:$scope.denunc[j].placa, noDen:$scope.resultado};
                $scope.Lplaca[i]=$scope.bus[i].placa;
                $scope.Ldenun[i]=$scope.resultado;
              }
            }
          }
          var ctx = document.getElementById("myChart").getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: $scope.Lplaca,
              datasets: [{
                backgroundColor: ["#2ecc71"],
                label: "Número de denuncias por buses",
                lineTension: 1,
                pointBorderColor:"1F0D7B",
                pointRadius: 3.5,
                pointBackgroundColor: "#18cfdf",
                data: $scope.Ldenun
              }]
            }
          });
        })
      })
    });
//mostrar numero de denuncias por rutas
    angular.module('transxelaWebApp')
    .controller('PmtDenRutaCtrl', function ($scope, $http) {
      $scope.nombre = [];
      $scope.cant = [];
      $scope.LrutaDen = [];
      $http.get("http://127.0.0.1:8000/reporte/pmt/RepBusRuta/")
      .success(function(data){
          console.log(data);
          $scope.busR = data;
          $http.get("http://127.0.0.1:8000/reporte/pmt/RepDuenioBusD/")
          .success(function(data){
            console.log(data);
            $scope.denuPlaca = data;
            $scope.pos = 0;
            for (var i = 0; i < $scope.busR.length; i++) {
              $scope.cont = 0;
              for (var j = 0; j < $scope.busR[i].bs.length; j++) {
                for (var x = 0; x < $scope.denuPlaca.length; x++) {
                  if ($scope.busR[i].bs[j].placa===$scope.denuPlaca[x].placa) {
                    $scope.cont = $scope.cont +1;
                  }
                }
              }
              $scope.LrutaDen[$scope.pos]={idrta:$scope.busR[i].idruta, noPlac:$scope.busR[i].nombre, cant:$scope.cont};
              $scope.nombre[$scope.pos]=$scope.busR[i].nombre;
              $scope.cant[$scope.pos]=$scope.cont;
              $scope.pos = $scope.pos + 1;
            }
            var ctx = document.getElementById("DenRutaGraph").getContext('2d');
            var myChart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: $scope.nombre,
                datasets: [{
                  backgroundColor: ["#2ecc71"],
                  label: "Número de denuncias por rutas",
                  lineTension: 1,
                  pointBorderColor:"1F0D7B",
                  pointRadius: 3.5,
                  pointBackgroundColor: "#18cfdf",
                  data: $scope.cant
                }]
              }
            });
          })
        })
      });
