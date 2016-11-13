'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:PmtHorariospilotoCtrl
 * @description
 * # PmtHorariospilotoCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('PmtHorariospilotoCtrl', function ($scope, apiService, $location, $cookies) {
    $scope.calendarView = 'month';
    $scope.viewDate = new Date();
    $scope.iterador = null;
    $scope.alertas = [];
    var colors = [{primary: '#e3bc08', secondary: '#fdf1ba'},
    {primary: '#1e90ff', secondary: '#d1e8ff'},
    {primary: '#ad2121', secondary: '#fae3e3'},
    {primary: '#3db048', secondary: '#e3faeb'},
    {primary: '#adabab', secondary: '#bcbaba'}];
    $scope.pilotoDPI = null;
    if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
      $scope.token = $cookies.getObject('user').token;

      $scope.buscar=function(){
        apiService.obtener('/piloto/'+ String($scope.pilotoDPI)+'/?tk='+ $scope.token).
        success(function(response, status, headers, config){
          $scope.piloto = response;
          $scope.cargarHorarios();
        }).
        error(function(response, status, headers, config) {
          switch(status) {
            case 400: {
              $scope.alertas.push({"tipo":"danger", "mensaje": "Piloto no encontrado"});
              break;
            }
            case 403: {
              $location.url('/403');
              break;
            }
            case 404: {
              $scope.alertas.push({"tipo":"danger", "mensaje": "Piloto no encontrado"});
              break;
            }
            default: {
              $location.url('/500');
            }
          }
        });
      };

      $scope.cargarHorarios = function(){
        $scope.events = [];
        apiService.obtener('/horariosdetalle/piloto/'+$scope.piloto.idpiloto+'/?tk='+$scope.token).
        success(function(response, status, headers, config){
          var horariosdetalle = response.HorarioDetalle;
          var fechaActual = new Date();
          var colorIndex = 0;
          fechaActual.setHours("0");
          fechaActual.setMinutes("0");
          fechaActual.setSeconds("0");
          for(var i = 0; i < horariosdetalle.length; i++) {
            var fechasplit = horariosdetalle[i].fecha.split("-");
            var fInicio = new Date("March 20, 2009 00:00:00");
            var fFin = new Date("March 20, 2009 00:00:00");
            fInicio.setFullYear(fechasplit[0], parseInt(fechasplit[1])-1, fechasplit[2]);
            fFin.setFullYear(fechasplit[0], parseInt(fechasplit[1])-1, fechasplit[2]);
            apiService.obtener('/duenio/horario/'+horariosdetalle[i].horario+'/'+$scope.token).
            success(function(response, status, headers, config){
              var horario = response;
              var hora_minutosI =  horario.horainicio.split(":");
              var hora_minutosF =  horario.horafin.split(":");
              fInicio.setHours(hora_minutosI[0]);
              fInicio.setMinutes(hora_minutosI[1]);
              fFin.setHours(hora_minutosF[0]);
              fFin.setMinutes(hora_minutosF[1]);
              if(fechaActual.getTime()<fInicio.getTime()){
                if(fechaActual.getDate() === fInicio.getDate()){
                  colorIndex = 1;
                }
                else {
                  colorIndex = 3;
                }
                if((horariosdetalle[i].hasOwnProperty("estado")) && (horariosdetalle[i].estado === 0)){
                  colorIndex = 4;
                }
              }
              $scope.events.push({
                title: horariosdetalle[i].chofer + " ",
                startsAt: fInicio,
                endsAt: fFin,
                color: colors[colorIndex],
                draggable: true,
                resizable: true,
                incrementsBadgeTotal: true,
                recursOn: 'year',
                cssClass: 'a-css-class-name',
                allDay: false,
                idhorariodetalle: horariosdetalle[i].idhorariodetalle
              });

            }).
            error(function(response, status, headers, config) {
            });

          }
        }).
        error(function(response, status, headers, config) {
          switch(status) {
            case 400: {
              $scope.alertas.push({"tipo":"danger", "mensaje": "Piloto no encontrado"});
              break;
            }
            case 403: {
              $location.url('/403');
              break;
            }
            case 404: {
              $scope.alertas.push({"tipo":"danger", "mensaje": "Piloto no encontrado"});
              break;
            }
            default: {
              $location.url('/500');
            }
          }
        });
      };
    }
    else{
      $location.url('/login');
    }
  });
