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
  $scope.usuario = $cookies.getObject('user').usuario;
  $scope.usuario = $cookies.getObject('user').usuario;
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
  }
  else{
    $location.url('/login');
  }
  $scope.buscar=function(){
    apiService.obtener('/piloto/'+$scope.pilotoDPI+'/?tk='+ $scope.token).
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
          $scope.alertas.push({"tipo":"danger", "mensaje": "Piloto no encontrado"});
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
      apiService.obtener('/horariosdetalle/piloto/' + $scope.piloto.idchofer + '/?tk=' + $scope.token).
      success(function(response, status, headers, config){
        $scope.piloto = {"idchofer": response.idchofer, "nombre": response.nombre,
        "apellidos": response.apellidos, "direccion": response.direccion,
        "dpi": response.dpi, "telefono": response.telefono, "correo": response.correo,
        "licencia": response.licencia, "tipolicencia": response.tipolicencia,
        "estado": response.estado, "duenio": response.duenio};
        var horariosdetalle = response.horariosDetalle;
        if(horariosdetalle.length === 0) {
          $scope.alertas.push({"tipo":"warning", "mensaje": "El piloto seleccionado no tiene asignaciones", "icono": "glyphicon glyphicon-exclamation-sign"});
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
                title: $scope.piloto.nombre + " " + $scope.piloto.apellidos + " / " + horariosdetalle[i].bus.marca + " " + horariosdetalle[i].bus.placa,
                startsAt: fInicio,
                endsAt: fFin,
                color: colors[colorIndex],
                draggable: true,
                resizable: true,
                incrementsBadgeTotal: true,
               //  recursOn: 'year',
                cssClass: 'a-css-class-name',
                allDay: false,


                estado: horariosdetalle[i].estado
              });
            }
            else{
              colorIndex = 0;
              if((horariosdetalle[i].hasOwnProperty("estado")) && (horariosdetalle[i].estado === 0)){
                colorIndex = 4;
              }
              $scope.events.push({
                title: $scope.piloto.nombre + " " + $scope.piloto.apellidos + " / " + horariosdetalle[i].bus.marca + " " + horariosdetalle[i].bus.placa,
                startsAt: fInicio,
                endsAt: fFin,
                color: colors[colorIndex],
                draggable: true,
                resizable: true,
                incrementsBadgeTotal: true,
               //  recursOn: 'year',
                cssClass: 'a-css-class-name',
                allDay: false
              });
            }
          }
          $scope.alertas.push({"tipo":"success", "mensaje": "Asignaciones cargadas exitosamente", "icono": "glyphicon glyphicon-ok"});
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




});
