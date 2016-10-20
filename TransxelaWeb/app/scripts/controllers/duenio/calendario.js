'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioCalendarioCtrl
 * @description
 * # DuenioCalendarioCtrl
 * Controller of the transxelaWebApp
 */

angular.module('transxelaWebApp').controller('DuenioCalendarioCtrl', function($scope, $resource) {
  $scope.calendarView = 'month';
  $scope.viewDate = new Date();
  var colors = [{primary: '#e3bc08', secondary: '#fdf1ba'},
  {primary: '#1e90ff', secondary: '#d1e8ff'},
  {primary: '#ad2121', secondary: '#fae3e3'},
  {primary: '#3db048', secondary: '#e3faeb'},
  {primary: '#adabab', secondary: '#bcbaba'}];
  $scope.apiurl = 'http://127.0.0.1:8000';
  $scope.events = [];
  var resource = $resource($scope.apiurl+'/duenio/1/horariosdetalle');
  var respuesta = resource.get(function() {
    $scope.duenio = {"nombre":respuesta.duenio.nombre, "apellidos": respuesta.duenio.apellidos};
    var horariosdetalle = respuesta.diasHorarioDetalle;
    var colorIndex = 0;
    for(var i = 0; i < horariosdetalle.length; i++) {
      if(colorIndex>4){
        colorIndex = 0;
      }
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
      $scope.events.push({
        title: horariosdetalle[i].chofer.nombre + " " + horariosdetalle[i].chofer.apellidos + " / " + horariosdetalle[i].bus.marca + " " + horariosdetalle[i].bus.placa,
        startsAt: fInicio,
        endsAt: fFin,
        color: colors[colorIndex],
        draggable: true,
        resizable: true,
        incrementsBadgeTotal: true,
        recursOn: 'year',
        cssClass: 'a-css-class-name',
        allDay: false
      });
      colorIndex +=1;
    }
  });

});
