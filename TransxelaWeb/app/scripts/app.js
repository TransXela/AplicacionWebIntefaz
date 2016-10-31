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
      .when('/login', {
        templateUrl: 'views/loginFail.html',
        controller: 'LogInCtrl',
        controllerAs: 'login'
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
      .when('/cultura/principalcultura', {
        templateUrl: 'views/cultura/principalcultura.html',
        controller: 'PopupDemoCont',
        controllerAs: 'cultura/principalcultura'
      })
      .when('/admin/lista', {
        templateUrl: 'views/admin/lista.html',
        controller: 'AdminListaCtrl',
        controllerAs: 'admin/lista'
      })
      .when('/pmt/principal', {
        templateUrl: 'views/pmt/principal.html',
        controller: 'PmtPrincipalCtrl',
        controllerAs: 'pmt/principal'
      })
      .when('/pmt/duenios', {
        templateUrl: 'views/pmt/duenios.html',
        controller: 'PmtDueniosCtrl',
        controllerAs: 'pmt/duenios'
      })
      .when('/pmt/rutas', {
        templateUrl: 'views/pmt/rutas.html',
        controller: 'PmtRutasCtrl',
        controllerAs: 'pmt/rutas'
      })
      .when('/pmt/horarios', {
        templateUrl: 'views/pmt/horarios.html',
        controller: 'PmtHorariosCtrl',
        controllerAs: 'pmt/horarios'
      })
      .when('/admin/perfil', {
        templateUrl: 'views/admin/perfil.html',
        controller: 'AdminPerfilCtrl',
        controllerAs: 'admin/perfil'
      })
      .when('/admin/principal', {
        templateUrl: 'views/admin/principal.html',
        controller: 'AdminPrincipalCtrl',
        controllerAs: 'admin/principal'
      })
      .when('/admin/usuarios', {
        templateUrl: 'views/admin/usuarios.html',
        controller: 'AdminUsuariosCtrl',
        controllerAs: 'admin/usuarios'
      })
      .when('/admin/listapmt', {
        templateUrl: 'views/admin/listapmt.html',
        controller: 'AdminListapmtCtrl',
        controllerAs: 'admin/listapmt'
      })
      .when('/admin/listadue', {
        templateUrl: 'views/admin/listadue.html',
        controller: 'AdminListadueCtrl',
        controllerAs: 'admin/listadue'
      })
      .when('/admin/listacul', {
        templateUrl: 'views/admin/listacul.html',
        controller: 'AdminListaculCtrl',
        controllerAs: 'admin/listacul'
      })
      .when('/admin/usuariosdes', {
        templateUrl: 'views/admin/usuariosdes.html',
        controller: 'AdminUsuariosdesCtrl',
        controllerAs: 'admin/usuariosdes'
      })
      .when('/admin/usuarioscrud', {
        templateUrl: 'views/admin/usuarioscrud.html',
        controller: 'AdminUsuarioscrudCtrl',
        controllerAs: 'admin/usuarioscrud'
      })
      .when('/404', {
        templateUrl: '404.html'
      })
      .when('/403', {
        templateUrl: '403.html'
      })
      .when('/admin/lispmtsinu', {
        templateUrl: 'views/admin/lispmtsinu.html',
        controller: 'AdminLispmtsinuCtrl',
        controllerAs: 'admin/lispmtsinu'
      })
      .when('/admin/dueniosinu', {
        templateUrl: 'views/admin/dueniosinu.html',
        controller: 'AdminDueniosinuCtrl',
        controllerAs: 'admin/dueniosinu'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
