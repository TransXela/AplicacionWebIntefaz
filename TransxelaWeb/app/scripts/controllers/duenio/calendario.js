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
  $scope.events = [
  {
    title: 'Titulo del evento', // The title of the event
    startsAt: new Date(), // A javascript date object for when the event starts
    endsAt: new Date(), // Optional - a javascript date object for when the event ends
    color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
      primary: '#e3bc08', // the primary event color (should be darker than secondary)
      secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
    },
    // actions: [{ // an array of actions that will be displayed next to the event title
    //   label: '<i class=\'glyphicon glyphicon-pencil\'></i>', // the label of the action
    //   cssClass: 'edit-action', // a CSS class that will be added to the action element so you can implement custom styling
    //   onClick: function(args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
    //     console.log('Edit event', args.calendarEvent);
    //   }
    // }],
    draggable: true, //Allow an event to be dragged and dropped
    resizable: true, //Allow an event to be resizable
    incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
    recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
    cssClass: 'a-css-class-name', //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
    allDay: false // set to true to display the event as an all day event on the day view
  },
  {
    title: 'Titulo del evento 2', // The title of the event
    startsAt: new Date(), // A javascript date object for when the event starts
    endsAt: new Date(), // Optional - a javascript date object for when the event ends
    color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
      primary: '#e3bc08', // the primary event color (should be darker than secondary)
      secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
    },
    // actions: [{ // an array of actions that will be displayed next to the event title
    //   label: '<i class=\'glyphicon glyphicon-pencil\'></i>', // the label of the action
    //   cssClass: 'edit-action', // a CSS class that will be added to the action element so you can implement custom styling
    //   onClick: function(args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
    //     console.log('Edit event', args.calendarEvent);
    //   }
    // }],
    draggable: true, //Allow an event to be dragged and dropped
    resizable: true, //Allow an event to be resizable
    incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
    recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
    cssClass: 'a-css-class-name', //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
    allDay: false // set to true to display the event as an all day event on the day view
  }
  ];
  var resource = $resource('http://127.0.0.1:8000/duenio/1/horarios');
  $scope.horarios = resource.query(function() {
    $scope.primero = $scope.horarios[3];
    $scope.segundo = $scope.horarios[2];
    $scope.hora_minutosI = $scope.primero.horainicio.split(":");
    $scope.hora_minutosF = $scope.primero.horafin.split(":");

    $scope.hora_minutosI2 = $scope.segundo.horainicio.split(":");
    $scope.hora_minutosF2 = $scope.segundo.horafin.split(":");
    $scope.events[0].startsAt.setHours($scope.hora_minutosI[0]);
    $scope.events[0].startsAt.setMinutes($scope.hora_minutosI[1]);
    $scope.events[0].endsAt.setHours($scope.hora_minutosF[0]);
    $scope.events[0].endsAt.setMinutes($scope.hora_minutosF[1]);

    $scope.events[1].startsAt.setHours($scope.hora_minutosI2[0]);
    $scope.events[1].startsAt.setMinutes($scope.hora_minutosI2[1]);
    $scope.events[1].endsAt.setHours($scope.hora_minutosF2[0]);
    $scope.events[1].endsAt.setMinutes($scope.hora_minutosF2[1]);
  });

});