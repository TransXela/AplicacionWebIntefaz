'use strict';

/**
* @ngdoc function
* @name transxelaWebApp.controller:DuenioCalendarioCtrl
* @description
* # DuenioCalendarioCtrl
* Controller of the transxelaWebApp
*/

angular.module('transxelaWebApp').controller('DuenioCalendarioCtrl', function($scope, $resource, $uibModal, $location, $cookies) {
  $scope.calendarView = 'month';
  $scope.viewDate = new Date();
  $scope.alertas = [];
  var colors = [{primary: '#e3bc08', secondary: '#fdf1ba'},
  {primary: '#1e90ff', secondary: '#d1e8ff'},
  {primary: '#ad2121', secondary: '#fae3e3'},
  {primary: '#3db048', secondary: '#e3faeb'},
  {primary: '#adabab', secondary: '#bcbaba'}];
  //$scope.apiurl = 'http://127.0.0.1:8000';
  $scope.apiurl = 'http://'+ $cookies.getObject('user').apiurl +':8000';
  $scope.idduenio = $cookies.getObject('user').id;
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
  $scope.events = [];
  var resource = $resource($scope.apiurl+'/duenio/'+$scope.idduenio+'/horariosdetalle');
  var respuesta = resource.get(function() {
    $scope.duenio = {"nombre":respuesta.duenio.nombre, "apellidos": respuesta.duenio.apellidos};
    var horariosdetalle = respuesta.diasHorarioDetalle;
    var colorIndex = 0;
    resource = $resource($scope.apiurl+'/duenio/'+$scope.idduenio+'/horarios');
    $scope.horarios = resource.query(function(){
      resource = $resource($scope.apiurl+'/duenio/'+$scope.idduenio+'/pilotos');
      var respuesta1 = resource.get(function(){
        $scope.pilotos = respuesta1.choferes;
        resource = $resource($scope.apiurl+'/duenio/'+$scope.idduenio+'/buses');
        var respuesta2 = resource.get(function(){
          $scope.buses = respuesta2.buses;
        }, function(response) {
          $location.url('/404');
        });
      }, function(response) {
        $location.url('/404');
      });
    }, function(response) {
      $location.url('/404');
    });
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
      if(fechaActual.getTime()<fInicio.getTime()){
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
          idhorario: horariosdetalle[i].horario.idhorario
        });
      }
      else{
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
      colorIndex +=1;
      }
    }, function(response) {
      $location.url('/404');
    });

  $scope.showCrear = function () {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/duenio/evento.html',
      controller:'CrearEController',
      resolve: {
        options: function () {
          return {"title": "Crear Evento", "buttom": "Crear", "apiurl": $scope.apiurl};
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
      $scope.events.push({
        title: chofer.nombre + " " + chofer.apellidos + " / " + bus.marca + " " + bus.placa,
        startsAt: fInicio,
        endsAt: fFin,
        color: colors[0],
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
        idhorario: result.horario
      });
      $scope.alertas.push({"tipo":"success", "mensaje": "Evento creado exitosamente"});
    }, function(response) {
        $location.url('/404');
    });
  };

  $scope.showVerModificar = function (evento) {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/duenio/evento.html',
      controller:'VerModificarEController',
      resolve: {
        options: function () {
          return {"title": "Modificar Evento", "buttom": "Modificar", "apiurl": $scope.apiurl};
        },
        horariodetalle: function () {
          return {"idhorariodetalle": evento.idhorariodetalle, "idhorario": evento.idhorario,
          "idpiloto": evento.idpiloto, "idbus": evento.idbus, "fecha": evento.startsAt};
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
      $scope.alertas.push({"tipo": "success", "mensaje": "Evento modificado exitosamente"});
    }, function (status) {
      if(status ==='success'){
        $scope.events.splice(evento.calendarEventId,1);
        $scope.alertas.push({"tipo": "success", "mensaje": "Evento eliminado exitosamente"});
      }
      else if(status ==='notdeleted'){
        $scope.alertas.push({"tipo": "danger", "mensaje": "Imposible eliminar el evento"});
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

});
angular.module('transxelaWebApp').controller('CrearEController', ['$scope', '$http','$uibModalInstance', 'options', 'data', function ($scope, $http, $uibModalInstance, options, data) {
  $scope.horario = null;
  $scope.piloto = null;
  $scope.bus = null;
  $scope.options = options;
  $scope.buses = data.buses;
  $scope.horarios = data.horarios;
  $scope.pilotos = data.pilotos;
  $scope.close = function () {
  var res = $http.post(options.apiurl+'/duenio/horariodetalle/', {bus: $scope.bus, chofer: $scope.piloto, horario: $scope.horario, "fecha": $scope.formatoFecha($scope.fecha)});
    res.success(function(data, status, headers, config) {
      $uibModalInstance.close(data, 500);
    });
    res.error(function(response, status, headers, config) {
      $uibModalInstance.dismiss('error');
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.formatoFecha = function(fecha){
    return fecha.getFullYear() + "-" + (fecha.getMonth()+1) + "-" + fecha.getDate();
  }
  $scope.today = function() {
    $scope.fecha = new Date();
  };
  $scope.today();
  $scope.clear = function() {
    $scope.fecha = null;
  };
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
angular.module('transxelaWebApp').controller('VerModificarEController', ['$scope', '$resource','$uibModalInstance', 'options', 'horariodetalle', 'data', function ($scope, $resource, $uibModalInstance, options, horariodetalle, data) {
  $scope.options = options;
  $scope.buses = data.buses;
  $scope.horarios = data.horarios;
  $scope.pilotos = data.pilotos;
  $scope.horario = String(horariodetalle.idhorario);
  $scope.piloto = String(horariodetalle.idpiloto);
  $scope.bus = String(horariodetalle.idbus);
  $scope.fecha = horariodetalle.fecha;
  $scope.close = function () {
    var resource = $resource(options.apiurl+'/duenio/horariodetalle/' + horariodetalle.idhorariodetalle, {}, {'update': {method:'PUT'}});
    resource.update({}, {bus: parseInt($scope.bus), chofer: parseInt($scope.piloto), horario: parseInt($scope.horario), "fecha": $scope.formatoFecha($scope.fecha)}).$promise.then(function(data) {
      $uibModalInstance.close({bus: parseInt($scope.bus), chofer: parseInt($scope.piloto), horario: parseInt($scope.horario), "fecha": $scope.formatoFecha($scope.fecha)}, 500);
    }, function(response) {
        $uibModalInstance.dismiss('error');
    });
  };

  $scope.delete = function () {
    var resource = $resource(options.apiurl+'/duenio/horariodetalle/' + horariodetalle.idhorariodetalle);
    resource.delete().$promise.then(function() {
      $uibModalInstance.dismiss('success');
    }, function(response) {
      $uibModalInstance.dismiss('error');
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.formatoFecha = function(fecha){
    return fecha.getFullYear() + "-" + (fecha.getMonth()+1) + "-" + fecha.getDate();
  }
  $scope.today = function() {
    $scope.fecha = new Date();
  };
  $scope.clear = function() {
    $scope.fecha = null;
  };
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
