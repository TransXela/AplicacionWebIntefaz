
'use strict';

/**
* @ngdoc function
* @name transxelaWebApp.controller:DuenioEstadisticasCtrl
* @description
* # DuenioEstadisticasCtrl
* Controller of the transxelaWebApp
*/

angular.module('transxelaWebApp')
.controller('DuenioEstadisticasCtrl',function ($scope, apiService, $cookies) {
  //muestra la cantidad de denuncias hacia un bus (no placa)
  if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
    $scope.idduenio = $cookies.getObject('user').id;
    $scope.token = $cookies.getObject('user').token;
    apiService.obtener('/reporte/duenio/RepDuenioBusesId/'+$scope.idduenio+'/'+$scope.token)
    .success(function(data){
      console.log(data);
      $scope.dueBs = data;
      apiService.obtener('/reporte/pmt/RepDuenioBusD'+'/'+$scope.token)
      .success(function(data){
        console.log(data);
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
    //muestra la cantidad de denuncias hacia un piloto
    $scope.cont = 0;
    $scope.Lchof = [];
    $scope.Lnumd = [];
    apiService.obtener('/reporte/duenio/RepDuenioChoferId/'+$scope.idduenio+'/'+$scope.token)
    .success(function(data){
      console.log(data);
      $scope.dueChof = data;
      apiService.obtener('/reporte/pmt/RepDuenioBusD'+'/'+$scope.token)
      .success(function(data){
        console.log(data);
        $scope.Denun = data;
          for (var j = 0; j < $scope.dueChof.plt.length; j++) {
            for (var k = 0; k < $scope.Denun.length; k++) {
              if ($scope.Denun[k].chofer === $scope.dueChof.plt[j].idchofer) {
                $scope.cont = $scope.cont + 1;
              }
            }
            $scope.Lchof[j] = $scope.dueChof.plt[j].dpi;
            $scope.Lnumd[j] = $scope.cont;
            $scope.cont=0;
          }
          var ctx = document.getElementById("ChofDenDueGraph").getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: $scope.Lchof,
              datasets: [{
                backgroundColor: ["#2ecc71"],
                label: "Número de denuncias por cada bus",
                lineTension: 1,
                pointBorderColor:"1F0D7B",
                pointRadius: 3.5,
                pointBackgroundColor: "#18cfdf",
                data: $scope.Lnumd
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
      //muestra la cantidad de denuncias hacia un bus (no placa)
    $scope.Dnum=0;
    $scope.RLruta=[];
    $scope.RLcant=[];
    apiService.obtener('/reporte/pmt/RepDuenioBusD'+'/'+$scope.token)
    .success(function(data){
      $scope.Rden=data;
      apiService.obtener('/reporte/duenio/RepBusChofId/'+$scope.idduenio+'/'+$scope.token)
      .success(function(data){
        $scope.Rbus=data;
        apiService.obtener('/ruta'+'/'+$scope.token)
        .success(function(data){
          $scope.Rruta=data;
          for (var i = 0; i < $scope.Rruta.length; i++) {
            for (var x = 0; x < $scope.Rbus.length; x++) {
              if ($scope.Rruta[i].idruta===$scope.Rbus[x].ruta) {
                for (var j = 0; j < $scope.Rden.length; j++) {
                  if ($scope.Rbus[x].placa===$scope.Rden[j].placa) {
                    $scope.Dnum=$scope.Dnum + 1;
                  }
                }
              }
            }
            $scope.RLruta[i]=$scope.Rruta[i].nombre;
            $scope.RLcant[i]=$scope.Dnum;
          }
          var ctx = document.getElementById("DueRutaDenGraph").getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: $scope.RLruta,
              datasets: [{
                backgroundColor: ["#2ecc71"],
                label: "Número de denuncias por cada bus",
                lineTension: 1,
                pointBorderColor:"1F0D7B",
                pointRadius: 3.5,
                pointBackgroundColor: "#18cfdf",
                data: $scope.RLcant
              }]
            }
          });
        })
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
    //muestra la cantidad de denuncias hacia un bus (no placa)
    $scope.Tcont=0;
    $scope.TLtipo=[];
    $scope.TLcant=[];
    apiService.obtener('/reporte/duenio/RepDuenioChoferId/'+$scope.idduenio+'/'+$scope.token)
    .success(function(data){
      $scope.TchofDue=data;
      apiService.obtener('/reporte/duenio/RepTipoDenD'+'/'+$scope.token)
      .success(function(data){
        $scope.Tden=data;
        for (var i = 0; i < $scope.Tden.length; i++) {
          for (var j = 0; j < $scope.TchofDue.plt.length; j++) {
            for (var k = 0; k < $scope.Tden[i].dnc.length; k++) {
              if ($scope.Tden[i].dnc[k].chofer===$scope.TchofDue.plt[j].idchofer) {
                $scope.Tcont=$scope.Tcont+1;
              }
            }
          }
          $scope.TLtipo[i]=$scope.Tden[i].descripcion;
          $scope.TLcant[i]=$scope.Tcont;
          $scope.Tcont=0;
        }
        var ctx = document.getElementById("DueTipDenDenGraph").getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: $scope.TLtipo,
            datasets: [{
              backgroundColor: ["#2ecc71"],
              label: "Número de denuncias por cada bus",
              lineTension: 1,
              pointBorderColor:"1F0D7B",
              pointRadius: 3.5,
              pointBackgroundColor: "#18cfdf",
              data: $scope.TLcant
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
});
