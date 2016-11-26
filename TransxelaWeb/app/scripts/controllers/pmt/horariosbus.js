'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:PmtHorariosbusCtrl
 * @description
 * # PmtHorariosbusCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('PmtHorariosbusCtrl', function ($scope, apiService, $location, $cookies) {
    $scope.calendarView = 'month';
    $scope.viewDate = new Date();
    $scope.iterador = null;
    $scope.alertas = [];
    var colors = [{primary: '#a4d1e1', secondary: '#a6ddf1'/*Celeste*/},
    {primary: '#1e90ff', secondary: '#d1e8ff'/*Azul*/},
    {primary: '#ad2121', secondary: '#fae3e3'/*Rojo*/},
    {primary: '#3db048', secondary: '#e3faeb'/*Verde*/},
    {primary: '#adabab', secondary: '#bcbaba'}/*Gris*/];

    if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
      $scope.token = $cookies.getObject('user').token;
      $scope.busPlaca = null;
      $scope.buscar=function(){
        apiService.obtener('/bus/'+ $scope.busPlaca+'/?tk='+ $scope.token).
        success(function(response, status, headers, config){
          $scope.bus = response;
          $scope.cargarHorarios();
        }).
        error(function(response, status, headers, config) {
          $scope.events = [];
          switch(status) {
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
      };
      $scope.cerrar = function(){
        $cookies.remove('user');
        $location.url('/');
      };
      $scope.cargarHorarios = function(){
          if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
            $scope.events = [];
            apiService.obtener('/horariosdetalle/bus/' + $scope.bus.idbus + '/?tk=' + $scope.token).
            success(function(response, status, headers, config){
              $scope.bus = response.Bus[0];
              var horariosdetalle = response.HorarioDetalle;
              if(horariosdetalle.length === 0) {
                $scope.alertas.push({"tipo":"warning", "mensaje": "El bus seleccionado no tiene horarios asignados"});
              }
              else{
                var colorIndex = 0;
                var fechaActual = new Date();
                fechaActual.setHours("0");
                fechaActual.setMinutes("0");
                fechaActual.setSeconds("0");
                for(var i = 0; i < horariosdetalle.length; i++) {
                  var fechasplit = horariosdetalle[i].fecha.split("-");
                  var fInicio = new Date("March 20, 2009 00:00:00");
                  var fFin = new Date("March 20, 2009 00:00:00");
                  fInicio.setFullYear(fechasplit[0], parseInt(fechasplit[1])-1, fechasplit[2]);
                  fFin.setFullYear(fechasplit[0], parseInt(fechasplit[1])-1, fechasplit[2]);
                  var hora_minutosI =  horariosdetalle[i].horario.horainicio.split(":");
                  var hora_minutosF =  horariosdetalle[i].horario.horafin.split(":");
                  fInicio.setHours(hora_minutosI[0]);
                  fInicio.setMinutes(hora_minutosI[1]);
                  fFin.setHours(hora_minutosF[0]);
                  fFin.setMinutes(hora_minutosF[1]);
                  if(fechaActual.getTime()<fInicio.getTime()){
                    if(fechaActual.getDate() === fInicio.getDate() && fechaActual.getMonth() === fInicio.getMonth()){
                      colorIndex = 3;
                    }
                    else {
                      colorIndex = 1;
                    }
                    if((horariosdetalle[i].hasOwnProperty("estado")) && (horariosdetalle[i].estado === 0)){
                      colorIndex = 4;
                    }
                    $scope.events.push({
                      title: horariosdetalle[i].chofer.nombre + " " + horariosdetalle[i].chofer.apellidos + " / " + $scope.bus.marca + " " + $scope.bus.placa,
                      startsAt: fInicio,
                      endsAt: fFin,
                      color: colors[colorIndex],
                      draggable: true,
                      resizable: true,
                      incrementsBadgeTotal: true,
                      cssClass: 'a-css-class-name',
                      allDay: false
                    });
                  }
                  else{
                    colorIndex = 0;
                    if((horariosdetalle[i].hasOwnProperty("estado")) && (horariosdetalle[i].estado === 0)){
                      colorIndex = 4;
                    }
                    $scope.events.push({
                      title: horariosdetalle[i].chofer.nombre + " " + horariosdetalle[i].chofer.apellidos + " / " + $scope.bus.marca + " " + $scope.bus.placa,
                      startsAt: fInicio,
                      endsAt: fFin,
                      color: colors[colorIndex],
                      draggable: true,
                      resizable: true,
                      incrementsBadgeTotal: true,
                      cssClass: 'a-css-class-name',
                      allDay: false
                    });
                  }
                }
                $scope.alertas.push({"tipo":"success", "mensaje": "Horarios cargados exitosamente"});
              }
            }).
            error(function(response, status, headers, config) {
              switch(status) {
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

          }
          else{
            $location.url('/login');
          }
        };
    }
    else{
      $location.url('/login');
    }
  });
