'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPrincipalCtrl
 * @description
 * # DuenioPrincipalCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioPrincipalCtrl', function ($scope, apiService, $location, $cookies) {
  if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
    $scope.idduenio = $cookies.getObject('user').id;
    $scope.token = $cookies.getObject('user').token;
    apiService.obtener('/duenio/'+$scope.idduenio+'/principal' + '?tk=' + $scope.token).
    success(function(response, status, headers, config){
      $scope.duenio = response;
    }).
    error(function(response, status, headers, config) {switch(status) {
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
    apiService.obtener('/reporte/duenio/RepDuenioBusesId/'+$scope.idduenio+'/'+'?tk='+$scope.token)
    .success(function(data){
      $scope.dueBs = data;
      $scope.cont = 0;
      $scope.Lplak = [];
      $scope.Lcnt = [];
      apiService.obtener('/reporte/pmt/RepDuenioBusD'+'/'+'?tk='+$scope.token)
      .success(function(data){
        $scope.Bs = data;
          for (var j = 0; j < $scope.dueBs.buss.length; j++) {
            for (var k = 0; k < $scope.Bs.length; k++) {
              if ($scope.Bs[k].placa === $scope.dueBs.buss[j].placa) {
                $scope.cont = $scope.cont + 1;
              }
            }
            $scope.Lplak[j] = $scope.dueBs.buss[j].placa;
            $scope.Lcnt[j] = $scope.cont;
            $scope.cont=0;
          }
          var ctx = document.getElementById("DueDenBusGraph").getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: $scope.Lplak,
              datasets: [{
                backgroundColor: ["#2ecc71"],
                label: "Número de denuncias por cada bus",
                lineTension: 1,
                pointBorderColor:"1F0D7B",
                pointRadius: 3.5,
                pointBackgroundColor: "#18cfdf",
                borderCapStyle: 'HOLA',
                data: $scope.Lcnt
              }]
            }
          });
        })
        .error(function(response, status, headers, config) {
          if(status === null || status === -1){
            $location.url('/404');
          }
          else if(status === 401){
            $location.url('/403');
          }
        });
    })
    .error(function(response, status, headers, config) {
      if(status === null || status === -1){
        $location.url('/404');
      }
      else if(status === 401){
        $location.url('/403');
      }
    });
  }
  else{
    $location.url('/login');
  }

  $scope.cerrar = function(){
    $cookies.remove('user');
    $location.url('/');
  };
});
