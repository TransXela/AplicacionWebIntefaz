'use strict';

/**
 * @ngdoc overview
 * @name transxelaWebApp
 * @description
 * # transxelaWebApp
 *
 * Main module of the application.
 */
angular
  .module('transxelaWebApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/duenio/principal', {
        templateUrl: 'views/duenio/principal.html',
        controller: 'DuenioPrincipalCtrl',
        controllerAs: 'duenio/principal'
      })
      .when('/duenio/pilotos', {
        templateUrl: 'views/duenio/pilotos.html',
        controller: 'DuenioPilotosCtrl',
        controllerAs: 'duenio/pilotos'
      })
      .when('/duenio/perfil', {
        templateUrl: 'views/duenio/perfil.html',
        controller: 'DuenioPerfilCtrl',
        controllerAs: 'duenio/perfil'
      })
      .when('/duenio/buses', {
        templateUrl: 'views/duenio/buses.html',
        controller: 'DuenioBusesCtrl',
        controllerAs: 'duenio/buses'
      })
      .when('/duenio/horarios', {
        templateUrl: 'views/duenio/horarios.html',
        controller: 'DuenioHorariosCtrl',
        controllerAs: 'duenio/horarios'
      })
      .when('/duenio/calendario', {
        templateUrl: 'views/duenio/calendario.html',
        controller: 'DuenioCalendarioCtrl',
        controllerAs: 'duenio/calendario'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
