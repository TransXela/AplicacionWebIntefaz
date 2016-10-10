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
    'ui.bootstrap',
    'angularModalService',
    'ui.grid',
    'mwl.calendar'
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
      .when('/duenio/estadisticas', {
        templateUrl: 'views/duenio/estadisticas.html',
        controller: 'DuenioEstadisticasCtrl',
        controllerAs: 'duenio/estadisticas'
      })
      .when('/operador/principal', {
        templateUrl: 'views/operador/principal.html',
        controller: 'OperadorPrincipalCtrl',
        controllerAs: 'operador/principal'
      })
      .when('/operador/denunciasRuta', {
        templateUrl: 'views/operador/denunciasruta.html',
        controller: 'OperadorDenunciasrutaCtrl',
        controllerAs: 'operador/denunciasRuta'
      })
      .when('/operador/denunciasBus', {
        templateUrl: 'views/operador/denunciasbus.html',
        controller: 'OperadorDenunciasbusCtrl',
        controllerAs: 'operador/denunciasBus'
      })
      .when('/operador/denunciasTipo', {
        templateUrl: 'views/operador/denunciastipo.html',
        controller: 'OperadorDenunciastipoCtrl',
        controllerAs: 'operador/denunciasTipo'
      })
      .when('/operador/duenios', {
        templateUrl: 'views/operador/duenios.html',
        controller: 'OperadorDueniosCtrl',
        controllerAs: 'operador/duenios'
      })
      .when('/operador/estadisticas', {
        templateUrl: 'views/operador/estadisticas.html',
        controller: 'OperadorEstadisticasCtrl',
        controllerAs: 'operador/estadisticas'
      })
      .when('/operador/perfil', {
        templateUrl: 'views/operador/perfil.html',
        controller: 'OperadorPerfilCtrl',
        controllerAs: 'operador/perfil'
      })


      .when('/cultura/principal', {
        templateUrl: 'views/cultura/principal.html',
        controller: 'PopupDemoCont',
        controllerAs: 'cultura/principal'
      })
      .when('/cultura/nuevaactividadcultural', {
        templateUrl: 'views/cultura/nuevaactividadcultural.html',
        controller: 'CulturaNuevaactividadculturalCtrl',
        controllerAs: 'cultura/nuevaactividadcultural'
      })
      
      .otherwise({
        redirectTo: '/'
      });
  });