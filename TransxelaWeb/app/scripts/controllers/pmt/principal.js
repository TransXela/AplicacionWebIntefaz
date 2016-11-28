'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:PmtPrincipalCtrl
 * @description
 * # PmtPrincipalCtr
 * Controller of the transxelaWebApp
 */

 //mostrar numero de denuncias por rutas

 angular.module('transxelaWebApp')
   .controller('PmtPrincipalCtrl', function ($scope, apiService, $cookies,  $location) {
     if(typeof $cookies.getObject('user')!='undefined' && $cookies.getObject('user')){
         $scope.token = $cookies.getObject('user').token;

           }
         });

 angular.module('transxelaWebApp')
 .controller('PmtDenRutaCtr', function ($scope, apiService, $cookies) {

   if(typeof $cookies.getObject('user')!='undefined' && $cookies.getObject('user')){
     //$scope.idduenio = $cookies.getObject('user').id;
     $scope.token = $cookies.getObject('user').token;

//muestra la cantidad de buses denunciados para PMT
    $scope.Lcant = [];
    apiService.obtener('/reporte/pmt/buses'+'/'+'?tk='+$scope.token)
    .success(function(data){
      $scope.busDen = data;
      $scope.Lplak = [];
      for (var i = 0; i < $scope.busDen.length; i++) {
        $scope.Lplak[i]=$scope.busDen[i].placa;
        $scope.Lcant[i]=$scope.busDen[i].cantidad;
      }
      var ctx = document.getElementById("busesGraph").getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: $scope.Lplak,
          datasets: [{
            backgroundColor: ["#2ecc71"],
            label: "Número de denuncias por BUSES",
            lineTension: 1,
            pointBorderColor:"1F0D7B",
            pointRadius: 3.5,
            pointBackgroundColor: "#18cfdf",
            data: $scope.Lcant
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

//muestra la cantidad de denuncias que tiene un duenio, de acuerdo a las denuncias que reciben sus pilotos
     apiService.obtener('/reporte/pmt/duenio'+'/'+'?tk='+$scope.token)
     .success(function(data){
       $scope.dueDen = data;
       $scope.LcntD = [];
       $scope.LdpiD = [];
       for (var i = 0; i < $scope.dueDen.length; i++) {
         $scope.LdpiD[i] = $scope.dueDen[i].dpi;
         $scope.LcntD[i] = $scope.dueDen[i].cantidad;
       }
       var ctx = document.getElementById("dueniosGraph").getContext('2d');
       var myChart = new Chart(ctx, {
         type: 'line',
         data: {
           labels: $scope.LdpiD,
           datasets: [{
             backgroundColor: ["#2ecc71"],
             label: "Número de denuncias por DUEÑO",
             lineTension: 1,
             pointBorderColor:"1F0D7B",
             pointRadius: 3.5,
             pointBackgroundColor: "#18cfdf",
             data: $scope.LcntD
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

// muestra cantidad de denuncias por tipo de denuncia
    apiService.obtener('/reporte/pmt/tipoDenuncia'+'/'+'?tk='+$scope.token)
    .success(function(data){
      $scope.tipDen = data;
      $scope.LtipT = [];
      $scope.LcntT = [];
      for (var i = 0; i < $scope.tipDen.length; i++) {
        $scope.LtipT[i] = $scope.tipDen[i].tipo;
        $scope.LcntT[i] = $scope.tipDen[i].cant;
      }
      var ctx = document.getElementById("tipoGraph").getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: $scope.LtipT,
          datasets: [{
            backgroundColor: ["#2ecc71"],
            label: "Número de denuncias por TIPO DE DENUNCIA",
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

//muestra las rutas denunciadas
    apiService.obtener('/reporte/pmt/rutas'+'/'+'?tk='+$scope.token)
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

//muestra los pilotos denunciados
      apiService.obtener('/reporte/pmt/pilotos'+'/'+'?tk='+$scope.token)
      .success(function(data){
        $scope.chofDen = data;
        $scope.LdpiC = [];
        $scope.LcntC = [];
        for (var i = 0; i < $scope.chofDen.length; i++) {
          $scope.LdpiC[i] = $scope.chofDen[i].dpi;
          $scope.LcntC[i] = $scope.chofDen[i].cantidad;
        }
        var ctx = document.getElementById("chofGraph").getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: $scope.LdpiC,
            datasets: [{
              backgroundColor: ["#2ecc71"],
              label: "Número de denuncias por PILOTO",
              lineTension: 1,
              pointBorderColor:"1F0D7B",
              pointRadius: 3.5,
              pointBackgroundColor: "#18cfdf",
              data: $scope.LcntC
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
 });
