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
    var colors = [{primary: '#e3bc08', secondary: '#fdf1ba'},
    {primary: '#1e90ff', secondary: '#d1e8ff'},
    {primary: '#ad2121', secondary: '#fae3e3'},
    {primary: '#3db048', secondary: '#e3faeb'},
    {primary: '#adabab', secondary: '#bcbaba'}];

    if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
      $scope.token = $cookies.getObject('user').token;
      $scope.busPlaca = null;
      $scope.buscar=function(){
        apiService.obtener('/bus/'+ $scope.busPlaca+'/'+ $scope.token).
        success(function(response, status, headers, config){
          $scope.bus = response;
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
        console.log('/horariosdetalle/bus/'+$scope.bus.idbus+'/'+$scope.token);
        apiService.obtener('/horariosdetalle/bus/'+$scope.bus.idbus+'/'+$scope.token).

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
            fInicio.setHours("7");
            fInicio.setMinutes("0");
            fFin.setHours("8");
            fFin.setMinutes("0");
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
    }
    else{
      $location.url('/login');
    }


  });
