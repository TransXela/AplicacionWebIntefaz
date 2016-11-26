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
         $scope.Lplaca = [];
         $scope.Ldenun = [];
         $scope.token = $cookies.getObject('user').token;
         apiService.obtener('/duenio/bus'+'/'+'?tk='+$scope.token)
         .success(function(data){
           $scope.bus = data;
           apiService.obtener('/reporte/pmt/RepDuenioBusD'+'/'+'?tk='+$scope.token)
           .success(function(data){
             $scope.denunc = data;
             $scope.res = [];
             for (var i = 0; i < $scope.bus.length; i++) {
               $scope.resultado = 0;
               for (var j = 0; j< $scope.denunc.length; j++) {
                 if ($scope.denunc[j].placa == $scope.bus[i].placa) {
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
             })
           }
         });
 angular.module('transxelaWebApp')
 .controller('PmtDenRutaCtr', function ($scope, apiService, $cookies) {

   if(typeof $cookies.getObject('user')!='undefined' && $cookies.getObject('user')){
     //$scope.idduenio = $cookies.getObject('user').id;
     $scope.nombre = [];
     $scope.cant = [];
     $scope.LrutaDen = [];
     $scope.token = $cookies.getObject('user').token;
     apiService.obtener('/reporte/pmt/RepBusRuta'+'/'+'?tk='+$scope.token)
     .success(function(data){
         $scope.busR = data;
         apiService.obtener('/reporte/pmt/RepDuenioBusD'+'/'+'?tk='+$scope.token)
         .success(function(data){
           $scope.denuPlaca = data;
           $scope.pos = 0;
           for (var i = 0; i < $scope.busR.length; i++) {
             $scope.cont=0;
             for (var j = 0; j < $scope.busR[i].bs.length; j++) {
               for (var x = 0; x < $scope.denuPlaca.length; x++) {
                 if ($scope.busR[i].bs[j].placa==$scope.denuPlaca[x].placa) {
                   $scope.cont = $scope.cont +1;
                 }
               }
             }
             if ($scope.cont>0) {
               $scope.LrutaDen[$scope.pos]={idrta:$scope.busR[i].idruta, noPlac:$scope.busR[i].nombre, cant:$scope.cont};
               $scope.nombre[$scope.pos]=$scope.busR[i].nombre;
               $scope.cant[$scope.pos]=$scope.cont;
               $scope.pos = $scope.pos + 1;
             }
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
                 yLabels: ['hola'],
                 data: $scope.cant
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
       $scope.cerrar = function(){
         $cookies.remove('user');
         $location.url('/');
       };

       apiService.obtener('/reporte/pmt/RepPilotoDen'+'/'+'?tk='+$scope.token)
       .success(function(data){
        $scope.pilotoDen = data;
        $scope.Ldpi=[];
        $scope.cant=0;
        $scope.numDen=[];
        for (var i = 0; i < $scope.pilotoDen.length; i++) {
          for (var j = 0; j < $scope.pilotoDen[i].den.length; j++) {
            $scope.cant = $scope.cant+1;
          }
          $scope.Ldpi[i]=$scope.pilotoDen[i].dpi;
          $scope.numDen[i]=$scope.cant;
          $scope.cant=0;
        }
        var ctx = document.getElementById("PilotoDenGraph").getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: $scope.Ldpi,
            datasets: [{
              backgroundColor: ["#2ecc71"],
              label: "Número de denuncias por piloto",
              lineTension: 1,
              pointBorderColor:"1F0D7B",
              pointRadius: 3.5,
              pointBackgroundColor: "#18cfdf",
              data: $scope.numDen
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

    $scope.Lplaca = [];
    $scope.Ldenun = [];
    apiService.obtener('/duenio/bus'+'/'+'?tk='+$scope.token)
      .success(function(data){
          $scope.bus = data;
          apiService.obtener('/reporte/pmt/RepDuenioBusD'+'/'+'?tk='+$scope.token)
          .success(function(data){
            $scope.denunc = data;
            $scope.res = [];
            for (var i = 0; i < $scope.bus.length; i++) {
              $scope.resultado = 0;
              for (var j = 0; j< $scope.denunc.length; j++) {
                if ($scope.denunc[j].placa == $scope.bus[i].placa) {
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
        apiService.obtener('/reporte/pmt/RepDuenioBuses'+'/'+'?tk='+$scope.token)
            .success(function(data){
              $scope.dueBus = data;
              $scope.Ddpi = [];
              $scope.cantD = 0;
              $scope.noDen = [];
              apiService.obtener('/reporte/pmt/RepDuenioBusD'+'/'+'?tk='+$scope.token)
                .success(function(data){
                  $scope.denPlak = data;
                  for (var a = 0; a < $scope.dueBus.length; a++) {
                    for (var i = 0; i < $scope.dueBus[a].buss.length; i++) {
                      for (var x = 0; x < $scope.denPlak.length; x++) {
                        if($scope.dueBus[a].buss[i].placa == $scope.denPlak[x].placa){
                          $scope.cantD = $scope.cantD + 1;
                        }
                      }
                    }
                    if($scope.cantD > 0){
                      $scope.Ddpi[a] = $scope.dueBus[a].dpi;
                      $scope.noDen[a] = $scope.cantD;
                    }
                    $scope.cantD = 0;
                  }
                })
                .error(function(response, status, headers, config) {
                  if(status === null || status === -1){
                    $location.url('/404');
                  }
                  else if(status === 401){
                    $location.url('/403');
                  }
                });

              var ctx = document.getElementById("DuenioDenGraph").getContext('2d');
              var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                  labels: $scope.Ddpi,
                  datasets: [{
                    backgroundColor: ["#2ecc71"],
                    label: "Número de denuncias por dueño",
                    lineTension: 1,
                    pointBorderColor:"1F0D7B",
                    pointRadius: 3.5,
                    pointBackgroundColor: "#18cfdf",
                    data: $scope.noDen
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
