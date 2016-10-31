'use strict';

/**
* @ngdoc function
* @name transxelaWebApp.controller:DuenioCalendarioCtrl
* @description
* # DuenioCalendarioCtrl
* Controller of the transxelaWebApp
*/

angular.module('transxelaWebApp').controller('DuenioCalendarioCtrl', function($scope, apiService, $uibModal, $location, $cookies) {
  $scope.calendarView = 'month';
  $scope.viewDate = new Date();
  $scope.alertas = [];
  var colors = [{primary: '#e3bc08', secondary: '#fdf1ba'/*Amarillo*/},
  {primary: '#1e90ff', secondary: '#d1e8ff'/*Azul*/},
  {primary: '#ad2121', secondary: '#fae3e3'/*Rojo*/},
  {primary: '#3db048', secondary: '#e3faeb'/*Verde*/},
  {primary: '#adabab', secondary: '#bcbaba'}/*Gris*/];
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
  if(typeof $cookies.getObject('user') != 'undefined' && $cookies.getObject('user')){
    $scope.events = [];
    $scope.idduenio = $cookies.getObject('user').id;
    $scope.token = $cookies.getObject('user').token;
    $scope.duenio = $cookies.getObject('user').usuario;
    apiService.obtener('/duenio/'+$scope.idduenio+'/horariosdetalle' + '/' + $scope.token).
    success(function(response, status, headers, config){
      $scope.duenio = {"nombre":response.duenio.nombre, "apellidos": response.duenio.apellidos};
      var horariosdetalle = response.diasHorarioDetalle;
      var colorIndex = 0;
      apiService.obtener('/duenio/'+$scope.idduenio+'/horarios' + '/' + $scope.token).
      success(function(response, status, headers, config){
        $scope.horarios = response;
        apiService.obtener('/duenio/'+$scope.idduenio+'/pilotos' + '/' + $scope.token).
        success(function(response, status, headers, config){
          $scope.pilotos = response.choferes;
          apiService.obtener('/duenio/'+$scope.idduenio+'/buses' + '/' + $scope.token).
          success(function(response, status, headers, config){
            $scope.buses = response.buses;
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
                if(fechaActual.getDate() === fInicio.getDate()){
                  colorIndex = 1;
                }
                else {
                  colorIndex = 3;
                }
                if((horariosdetalle[i].hasOwnProperty("estado")) && (horariosdetalle[i].estado === 0)){
                  colorIndex = 4;
                }
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
                  idhorariodetalle: horariosdetalle[i].idhorariodetalle,
                  idpiloto: horariosdetalle[i].chofer.idchofer,
                  idbus: horariosdetalle[i].bus.idbus,
                  idhorario: horariosdetalle[i].horario.idhorario,
                  estado: horariosdetalle[i].estado
                });
              }
              else{
                colorIndex = 0;
                if((horariosdetalle[i].hasOwnProperty("estado")) && (horariosdetalle[i].estado === 0)){
                  colorIndex = 4;
                }
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
              }
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
        }).
        error(function(response, status, headers, config) {
          if(status === null || status === -1){
            $location.url('/404');
          }
          else if(status === 401){
            $location.url('/403');
          }
        });
      }).
      error(function(response, status, headers, config) {
        if(status === null || status === -1){
          $location.url('/404');
        }
        else if(status === 401){
          $location.url('/403');
        }
      });
    }).
    error(function(response, status, headers, config) {
      if(status === null || status === -1){
        $location.url('/404');
      }
      else if(status === 401){
        $location.url('/403');
      }
    });
  }
  else{
    $location.url('/login');
  }

  $scope.showCrear = function () {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/duenio/evento.html',
      controller:'CrearEController',
      resolve: {
        options: function () {
          return {"title": "Crear Evento", "buttom": "Crear", "token": $scope.token};
        },
        data: function () {
          return {"horarios": $scope.horarios, "buses": $scope.buses, "pilotos": $scope.pilotos};
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      var fechasplit = result.fecha.split("-");
      var fInicio = new Date("March 20, 2009 00:00:00");
      var fFin = new Date("March 20, 2009 00:00:00");
      fInicio.setFullYear(fechasplit[0], parseInt(fechasplit[1])-1, fechasplit[2]);
      fFin.setFullYear(fechasplit[0], parseInt(fechasplit[1])-1, fechasplit[2]);
      var horario = $scope.getValueFromAttrAndValue($scope.horarios, "idhorario", result.horario);
      var hora_minutosI =  horario.horainicio.split(":");
      var hora_minutosF =  horario.horafin.split(":");
      fInicio.setHours(hora_minutosI[0]);
      fInicio.setMinutes(hora_minutosI[1]);
      fFin.setHours(hora_minutosF[0]);
      fFin.setMinutes(hora_minutosF[1]);
      var chofer = $scope.getValueFromAttrAndValue($scope.pilotos, "idchofer", result.chofer);
      var bus = $scope.getValueFromAttrAndValue($scope.buses, "idbus", result.bus);
      var fechaActual = new Date();
      fechaActual.setHours("0");
      fechaActual.setMinutes("0");
      fechaActual.setSeconds("0");
      var colorIndex = 0;
      if(fechaActual.getDate() === fInicio.getDate()){
        colorIndex = 1;
      }
      else {
        colorIndex = 3;
      }
      if(result.estado === 0){
        colorIndex = 4;
      }
      if(result.hasOwnProperty("dias")){
        $scope.events.push({
          title: chofer.nombre + " " + chofer.apellidos + " / " + bus.marca + " " + bus.placa,
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
          idhorariodetalle: result.idhorariodetalle,
          idpiloto: result.chofer,
          idbus: result.bus,
          idhorario: result.horario,
          estado: result.estado
        });
        $scope.alertas.push({"tipo":"success", "mensaje": "Eventos creados exitosamente"});
      }
      else{
        $scope.events.push({
          title: chofer.nombre + " " + chofer.apellidos + " / " + bus.marca + " " + bus.placa,
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
          idhorariodetalle: result.idhorariodetalle,
          idpiloto: result.chofer,
          idbus: result.bus,
          idhorario: result.horario,
          estado: result.estado
        });
        $scope.alertas.push({"tipo":"success", "mensaje": "Evento creado exitosamente"});
      }
    }, function(response) {
      if(response === 'error'){
        $location.url('/404');
      }
    });
  };

  $scope.showVerModificar = function (evento) {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/duenio/evento.html',
      controller:'VerModificarEController',
      resolve: {
        options: function () {
          return {"title": "Modificar Evento", "buttom": "Modificar", "token": $scope.token};
        },
        horariodetalle: function () {
          return {"idhorariodetalle": evento.idhorariodetalle, "idhorario": evento.idhorario,
          "idpiloto": evento.idpiloto, "idbus": evento.idbus, "fecha": evento.startsAt, "estado": evento.estado};
        },
        data: function () {
          return {"horarios": $scope.horarios, "buses": $scope.buses, "pilotos": $scope.pilotos};
        }
      }
    });

    uibModalInstance.result.then(function (result) {
      var fechasplit = result.fecha.split("-");
      var fInicio = new Date();
      var fFin =  new Date();
      fInicio.setFullYear(fechasplit[0], parseInt(fechasplit[1])-1, fechasplit[2]);
      fFin.setFullYear(fechasplit[0], parseInt(fechasplit[1])-1, fechasplit[2]);
      var horario = $scope.getValueFromAttrAndValue($scope.horarios, "idhorario", result.horario);
      var hora_minutosI =  horario.horainicio.split(":");
      var hora_minutosF =  horario.horafin.split(":");
      fInicio.setHours(hora_minutosI[0]);
      fInicio.setMinutes(hora_minutosI[1]);
      fFin.setHours(hora_minutosF[0]);
      fFin.setMinutes(hora_minutosF[1]);
      var chofer = $scope.getValueFromAttrAndValue($scope.pilotos, "idchofer", result.chofer);
      var bus = $scope.getValueFromAttrAndValue($scope.buses, "idbus", result.bus);
      $scope.events[evento.calendarEventId].title = chofer.nombre + " " + chofer.apellidos + " / " + bus.marca + " " + bus.placa;
      $scope.events[evento.calendarEventId].startsAt = fInicio;
      $scope.events[evento.calendarEventId].endsAt = fFin;
      var fechaActual = new Date();
      fechaActual.setHours("0");
      fechaActual.setMinutes("0");
      fechaActual.setSeconds("0");
      var colorIndex = 0;
      if(fechaActual.getDate() === fInicio.getDate()){
        colorIndex = 1;
      }
      else {
        colorIndex = 3;
      }
      if(result.estado === 0){
        colorIndex = 4;
      }
      $scope.events[evento.calendarEventId].color = colors[colorIndex];
      $scope.alertas.push({"tipo": "success", "mensaje": "Evento modificado exitosamente"});
    }, function (status) {
      if(status ==='success'){
        $scope.events.splice(evento.calendarEventId,1);
        $scope.alertas.push({"tipo": "success", "mensaje": "Evento eliminado exitosamente"});
      }
      else if(status ==='imposibleborrar'){
        $scope.alertas.push({"tipo": "danger", "mensaje": "Imposible eliminar el evento"});
      }
      else if(status ==='notdeleted'){
        $scope.alertas.push({"tipo": "warning", "mensaje": "No es posible eliminar eventos del día actual"});
      }
      else if(status === 'error'){
        $location.url('/404');
      }
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

  $scope.cerrar = function(){
    $cookies.remove('user');
      $location.url('/');
  };
});

angular.module('transxelaWebApp').controller('CrearEController', ['$scope', 'apiService','$uibModalInstance', 'options', 'data', function ($scope, apiService, $uibModalInstance, options, data) {
  $scope.horario = null;
  $scope.piloto = null;
  $scope.bus = null;
  $scope.estado = "1";
  $scope.fecha = new Date();
  $scope.fechafin = null;
  $scope.col = 4;
  $scope.options = options;
  $scope.buses = data.buses;
  $scope.horarios = data.horarios;
  $scope.pilotos = data.pilotos;
  $scope.alertas = [];
  $scope.close = function () {
    if($scope.fechafin != null){
      if(($scope.fechafin-$scope.fecha)>0){
        apiService.crear('/duenio/horariosdetalle/crearrango' + '/' + options.token + '/', {bus: $scope.bus, chofer: $scope.piloto,
            horario: $scope.horario, fechaInicial: $scope.formatoFecha($scope.fecha),
            fechaFinal: $scope.formatoFecha($scope.fechafin), estado: parseInt($scope.estado)}).
            success(function(data, status, headers, config) {
              var dias = Math.floor(($scope.fechafin-$scope.fecha) / (1000 * 60 * 60 * 24))+1;
              $uibModalInstance.close({"bus": parseInt($scope.bus), "chofer": parseInt($scope.piloto), "horario": parseInt($scope.horario),
                "fecha": $scope.formatoFecha($scope.fecha), "estado": parseInt($scope.estado), "dias": dias}, 500);
            }).
            error(function(response, status, headers, config) {
              $uibModalInstance.dismiss('error');
            });
      }
      else{
        $scope.alertas.push({"tipo":"warning", "mensaje": "Fecha fin debe ser mayor o diferente a Fecha"});
      }
    }
    else{
      apiService.crear('/duenio/horariodetalle' + '/' + options.token + '/', {bus: $scope.bus, chofer: $scope.piloto, horario: $scope.horario, "fecha": $scope.formatoFecha($scope.fecha), "estado": parseInt($scope.estado)}).
        success(function(data, status, headers, config) {
          $uibModalInstance.close(data, 500);
        }).
        error(function(response, status, headers, config) {
          $uibModalInstance.dismiss('error');
        });
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.formatoFecha = function(fecha){
    return fecha.getFullYear() + "-" + (fecha.getMonth()+1) + "-" + fecha.getDate();
  }
  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 0
  };
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };
  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.fecha = new Date(year, month, day);
  };

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };
}]);
angular.module('transxelaWebApp').controller('VerModificarEController', ['$scope', 'apiService','$uibModalInstance', 'options', 'horariodetalle', 'data', function ($scope, apiService, $uibModalInstance, options, horariodetalle, data) {
  $scope.options = options;
  $scope.buses = data.buses;
  $scope.horarios = data.horarios;
  $scope.pilotos = data.pilotos;
  $scope.estado = String(horariodetalle.estado);
  $scope.horario = String(horariodetalle.idhorario);
  $scope.piloto = String(horariodetalle.idpiloto);
  $scope.bus = String(horariodetalle.idbus);
  $scope.fecha = horariodetalle.fecha;
  $scope.col = 10;
  $scope.close = function () {
    apiService.modificar('/duenio/horariodetalle/' + horariodetalle.idhorariodetalle + '/' + options.token + '/', {bus: parseInt($scope.bus), chofer: parseInt($scope.piloto), horario: parseInt($scope.horario), "fecha": $scope.formatoFecha($scope.fecha), "estado": parseInt($scope.estado)}).
    success(function(response, status, headers, config){
      $uibModalInstance.close({bus: parseInt($scope.bus), chofer: parseInt($scope.piloto), horario: parseInt($scope.horario), "fecha": $scope.formatoFecha($scope.fecha), "estado": parseInt($scope.estado)}, 500);
    }).
    error(function(response, status, headers, config) {
      $uibModalInstance.dismiss('error');
    });
  };

  $scope.delete = function () {
    if(horariodetalle.fecha.getDate() !== new Date().getDate()){
        apiService.borrar('/duenio/horariodetalle/' + horariodetalle.idhorariodetalle + '/' + options.token + '/').
        success(function(response, status, headers, config){
          $uibModalInstance.dismiss('success');
        }).
        error(function(response, status, headers, config) {
          $uibModalInstance.dismiss('imposibleborrar');
        });
    }
    else{
      $uibModalInstance.dismiss('notdeleted');
    }

  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.formatoFecha = function(fecha){
    return fecha.getFullYear() + "-" + (fecha.getMonth()+1) + "-" + fecha.getDate();
  }

  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 0
  };

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.fecha = new Date(year, month, day);
  };

  $scope.popup1 = {
    opened: false
  };
}]);
