'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:PmtHorariospilotoCtrl
 * @description
 * # PmtHorariospilotoCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('PmtHorariospilotoCtrl', function ($scope, apiService, $location) {
    $scope.calendarView = 'month';
    $scope.viewDate = new Date();
    $scope.alertas = [];
    var colors = [{primary: '#e3bc08', secondary: '#fdf1ba'},
    {primary: '#1e90ff', secondary: '#d1e8ff'},
    {primary: '#ad2121', secondary: '#fae3e3'},
    {primary: '#3db048', secondary: '#e3faeb'},
    {primary: '#adabab', secondary: '#bcbaba'}];
    $scope.pilotoDPI = null;
    $scope.buscar=function(){
      apiService.obtener('/pilotos/'+ $scope.pilotoDPI).
      success(function(response, status, headers, config){
        $scope.piloto = response;
        $scope.cargarHorarios();
      }).
      error(function(response, status, headers, config) {
        if(status === null || status === -1){
          $location.url('/404');
        }
        else if(status === 401){
          $location.url('/403');
        }
      });
    };
    $scope.cargarHorarios = function(){
      $scope.events = [];
      apiService.obtener('/horariosdetalle/piloto/'+$scope.piloto.dpi).
      success(function(response, status, headers, config){
        var horariosdetalle = response.HorarioDetalle;
        $scope.hd = horariosdetalle;
        var fechaActual = new Date();
        var colorIndex = 0;
        fechaActual.setHours("0");
        fechaActual.setMinutes("0");
        fechaActual.setSeconds("0");
        var horariosdetalle2 = null;
        for(var i = 0; i < horariosdetalle.length; i++) {
          horariosdetalle2 = null;
          horariosdetalle2=horariosdetalle[i];
          var fechasplit = horariosdetalle2.fecha.split("-");
          var fInicio = new Date("March 20, 2009 00:00:00");
          var fFin = new Date("March 20, 2009 00:00:00");
          fInicio.setFullYear(fechasplit[0], parseInt(fechasplit[1])-1, fechasplit[2]);
          fFin.setFullYear(fechasplit[0], parseInt(fechasplit[1])-1, fechasplit[2]);
          //Se debe de mapear el horario.
          apiService.obtener('/duenio/horario/'+horariosdetalle2.horario).
          success(function(response, status, headers, config){
            var hora_minutosI =  response.horainicio.split(":");
            var hora_minutosF =  response.horafin.split(":");
            fInicio.setHours(hora_minutosI[0]);
            fInicio.setMinutes(hora_minutosI[1]);
            fFin.setHours(hora_minutosF[0]);
            fFin.setMinutes(hora_minutosF[1]);
            apiService.obtener('/duenio/piloto/'+horariosdetalle2.chofer).
            success(function(response, status, headers, config){
              if(fechaActual.getTime()<fInicio.getTime()){
                if(fechaActual.getDate() === fInicio.getDate()){
                  colorIndex = 1;
                }
                else {
                  colorIndex = 3;
                }
                if((horariosdetalle2.hasOwnProperty("estado")) && (horariosdetalle2.estado === 0)){
                  colorIndex = 4;
                }
              }
              console.log($scope.bus);
              console.log(response);
              console.log(fInicio);
              $scope.events.push({
                title: response.nombre + " " + response.apellidos + " / " + $scope.bus.marca + " " + $scope.bus.placa,
                startsAt: fInicio,
                endsAt: fFin,
                color: colors[colorIndex],
                draggable: true,
                resizable: true,
                incrementsBadgeTotal: true,
                recursOn: 'year',
                cssClass: 'a-css-class-name',
                allDay: false,
                idhorariodetalle: horariosdetalle2.idhorariodetalle
              });
            }).
            error(function(response, status, headers, config) {
            });
          }).
          error(function(response, status, headers, config) {
          });
        }
      }).
      error(function(response, status, headers, config) {
        if(status === null || status === -1){
          $location.url('/404');
        }
        else if(status === 401){
          $location.url('/403');
        }
      });
    };
  });
