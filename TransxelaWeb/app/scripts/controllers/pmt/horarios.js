'use strict';

/**
* @ngdoc function
* @name transxelaWebApp.controller:PmtHorariosCtrl
* @description
* # PmtHorariosCtrl
* Controller of the transxelaWebApp
*/
angular.module('transxelaWebApp').controller('PmtHorariosCtrl', function ($scope, $resource, $uibModal, $location) {
  $scope.calendarView = 'month';
  $scope.viewDate = new Date();
  $scope.alertas = [];
  var colors = [{primary: '#e3bc08', secondary: '#fdf1ba'},
  {primary: '#1e90ff', secondary: '#d1e8ff'},
  {primary: '#ad2121', secondary: '#fae3e3'},
  {primary: '#3db048', secondary: '#e3faeb'},
  {primary: '#adabab', secondary: '#bcbaba'}];
  $scope.apiurl = 'http://127.0.0.1:8000';
  $scope.idduenio = null;
  var resource = $resource($scope.apiurl+'/pmt/duenio');
  var query = resource.query(function(){
    $scope.duenios = query;
  });
  var actions = [{
    label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
    onClick: function(args) {
      $scope.showVerModificar(args.calendarEvent);
    }
  }// , {
  //   label: '<i class=\'glyphicon glyphicon-remove\'></i>',
  //   onClick: function(args) {
  //     alert(args.calendarEvent.idhorariodetalle);
  //   }}
  ];

  $scope.cargarHorarios = function(){
    $scope.events = [];
    console.log($scope.apiurl+'/duenio/'+parseInt($scope.idduenio)+'/horariosdetalle');
    var resource = $resource($scope.apiurl+'/duenio/'+parseInt($scope.idduenio)+'/horariosdetalle');
    var respuesta = resource.get(function() {
      $scope.duenio = {"nombre":respuesta.duenio.nombre, "apellidos": respuesta.duenio.apellidos};
      var horariosdetalle = respuesta.diasHorarioDetalle;
      $scope.hd = horariosdetalle;
      var colorIndex = 0;
      var fechaActual = new Date();
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
          allDay: false,
          actions: actions,
          idhorariodetalle: horariosdetalle[i].idhorariodetalle
        });
        colorIndex +=1;
        }
      }, function(response) {
        $location.url('/404');
      });
  };
  $scope.getValueFromAttrAndValue = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return array[i];
        }
    }
    return null;
  };

});
