'use strict';

/**
* @ngdoc function
* @name transxelaWebApp.controller:DuenioEstadisticasCtrl
* @description
* # DuenioEstadisticasCtrl
* Controller of the transxelaWebApp
*/

angular.module('transxelaWebApp')
.controller('DuenioEstadisticasCtrl',function ($scope, apiService, $cookies, $location) {
  //muestra la cantidad de denuncias hacia un bus (no placa)
  if(typeof $cookies.getObject('user') !== 'undefined' && $cookies.getObject('user')){
    $scope.idduenio = $cookies.getObject('user').id;
    $scope.token = $cookies.getObject('user').token;
    $scope.duenio = $cookies.getObject('user').usuario;
//muestra los buses denunciadas
      apiService.obtener('/reporte/duenio/buses/'+$scope.idduenio+'/'+'?tk='+$scope.token)
      .success(function(data){
        $scope.busDen = data;
        $scope.LplkB = [];
        $scope.LcntB = [];
        for (var i = 0; i < $scope.busDen.length; i++) {
          $scope.LplkB[i] = $scope.busDen[i].placa;
          $scope.LcntB[i] = $scope.busDen[i].cant;
        }
        var ctx = document.getElementById("busGraph").getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: $scope.LplkB,
            datasets: [{
              backgroundColor: ["#2ecc71"],
              label: "Número de denuncias por BUSES",
              lineTension: 1,
              pointBorderColor:"1F0D7B",
              pointRadius: 3.5,
              pointBackgroundColor: "#18cfdf",
              data: $scope.LcntB
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

//muestra los pilotos denunciadas
        apiService.obtener('/reporte/duenio/pilotos/'+$scope.idduenio+'/'+'?tk='+$scope.token)
        .success(function(data){
          $scope.chofDen = data;
          $scope.LdpiP = [];
          $scope.LcntP = [];
          for (var i = 0; i < $scope.chofDen.length; i++) {
            $scope.LdpiP[i] = $scope.chofDen[i].dpi;
            $scope.LcntP[i] = $scope.chofDen[i].cant;
          }
          var ctx = document.getElementById("chofGraph").getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
            labels: $scope.LdpiP,
            datasets: [{
            backgroundColor: ["#2ecc71"],
            label: "Número de denuncias por PILOTO",
            lineTension: 1,
            pointBorderColor:"1F0D7B",
            pointRadius: 3.5,
            pointBackgroundColor: "#18cfdf",
            data: $scope.LcntP
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
//muestra el numero de denuncias por rutas
      apiService.obtener('/reporte/duenio/rutas/'+$scope.idduenio+'/'+'?tk='+$scope.token)
      .success(function(data){
        $scope.rutaDen = data;
        $scope.LrutaR = [];
        $scope.LcntR = [];
        for (var i = 0; i < $scope.rutaDen.length; i++) {
          $scope.LrutaR[i] = $scope.rutaDen[i].ruta;
          $scope.LcntR[i] = $scope.rutaDen[i].cant;
        }
        var ctx = document.getElementById("rutaGraph").getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
          labels: $scope.LrutaR,
          datasets: [{
          backgroundColor: ["#2ecc71"],
          label: "Número de denuncias por RUTA",
          lineTension: 1,
          pointBorderColor:"1F0D7B",
          pointRadius: 3.5,
          pointBackgroundColor: "#18cfdf",
          data: $scope.LcntR
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

//muestra tipo de denuncias
    apiService.obtener('/reporte/duenio/tipoDenuncia/'+$scope.idduenio+'/'+'?tk='+$scope.token)
    .success(function(data){
      $scope.tipoDen = data;
      $scope.LtipoT = [];
      $scope.LcntT = [];
      for (var i = 0; i < $scope.tipoDen.length; i++) {
        $scope.LtipoT[i] = $scope.tipoDen[i].tipo;
        $scope.LcntT[i] = $scope.tipoDen[i].cant;
      }
      var ctx = document.getElementById("tipoGraph").getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: $scope.LtipoT,
        datasets: [{
        backgroundColor: ["#2ecc71"],
        label: "Número de denuncias por TIPO DENUNCIA",
        lineTension: 1,
        pointBorderColor:"1F0D7B",
        pointRadius: 3.5,
        pointBackgroundColor: "#18cfdf",
        data: $scope.LcntT
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
  }
  $scope.cerrar = function(){
    $cookies.remove('user');
      $location.url('/');
  };
});
