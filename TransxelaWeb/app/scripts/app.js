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
  'ui.grid.pagination',
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
  // Duenio routes
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
  .when('/duenio/calendariobus', {
    templateUrl: 'views/duenio/calendariobus.html',
    controller: 'DuenioCalendariobusCtrl',
    controllerAs: 'duenio/calendariobus'
  })
  .when('/duenio/calendariopiloto', {
    templateUrl: 'views/duenio/calendariopiloto.html',
    controller: 'DuenioCalendariopilotoCtrl',
    controllerAs: 'duenio/calendariopiloto'
  })
  // Operador routes
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
  .when('/operador/denuncias', {
    templateUrl: 'views/operador/denuncias.html',
    controller: 'OperadorDenunciasCtrl',
    controllerAs: 'operador/denuncias'
  })
  .when('/operador/denunciasrutas', {
    templateUrl: 'views/operador/denunciasrutas.html',
    controller: 'OperadorDenunciasrutasCtrl',
    controllerAs: 'operador/denunciasrutas'
  })
  // Pmt routes
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
  .when('/pmt/horariosBus', {
    templateUrl: 'views/pmt/horariosbus.html',
    controller: 'PmtHorariosbusCtrl',
    controllerAs: 'pmt/horariosBus'
  })
  .when('/pmt/horariosPiloto', {
    templateUrl: 'views/pmt/horariospiloto.html',
    controller: 'PmtHorariospilotoCtrl',
    controllerAs: 'pmt/horariosPiloto'
  })
  // Error routes
  .when('/404', {
    templateUrl: '404.html'
  })
  .when('/403', {
    templateUrl: '403.html'
  })
  .when('/500', {
    templateUrl: '500.html'
  })
  // Report routes
  .when('/reporte/rutasdenunciadas', {
    templateUrl: 'views/Reportes/Reporte.html',
    controller: 'PmtDenRutaCtr',
    controllerAs: 'pmt/principal'
  })
  // Cultura routes
  .when('/cultura/principalcultura', {
    templateUrl: 'views/cultura/principalcultura.html',
    controller: 'PrincipalCulturaCtrl',
    controllerAs: 'cultura/principalcultura'
  })
  .when('/cultura/principalactividades', {
    templateUrl: 'views/cultura/principalcultura.html',
    controller: 'PrincipalCulturaCtrl',
    controllerAs: 'cultura/principalcultura'
  })
  .when('/cultura/principalfaq', {
    templateUrl: 'views/cultura/principalfaq.html',
    controller: 'PrincipalFaqCtrl',
    controllerAs: 'cultura/principalfaq'
  })
  .when('/cultura/principalconsejo', {
    templateUrl: 'views/cultura/principalconsejo.html',
    controller: 'PrincipalConsejoCtrl',
    controllerAs: 'cultura/principalconsejo'
  })
  .when('/cultura/veractividadesculturales', {
    templateUrl: 'views/cultura/veractividadescultura.html',
    controller: 'VerActividadesCtrl',
    controllerAs: 'cultura/veractividadescultura'
  })
  .when('/cultura/principal', {
    templateUrl: 'views/cultura/principal.html',
    controller: 'PrincipalCtrl',
    controllerAs: 'cultura/principal'
  })
  .when('/admin/cultura', {
    templateUrl: 'views/admin/cultura.html',
    controller: 'AdminCulturaCtrl',
    controllerAs: 'admin/cultura'
  })
  .when('/admin/principal', {
    templateUrl: 'views/admin/principal.html',
    controller: 'AdminPrincipalCtrl',
    controllerAs: 'admin/principal'
  })
  .when('/admin/usuarioscrud', {
    templateUrl: 'views/admin/usuarioscrud.html',
    controller: 'AdminUsuarioscrudCtrl',
    controllerAs: 'admin/usuarioscrud'
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
})
.service('apiService', function($cookies, $http) {
  //var apiURL = 'http://api.transxela.site';
  var apiURL = 'http://127.0.0.1:8000';
  //$http.defaults.headers.common['Access-Control-Allow-Headers'] = "Content-Type";
  //$http.defaults.headers.common['Access-Control-Allow-Methods'] = "GET, POST, PUT, DELETE, OPTIONS";
  //$http.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
  var obtener = function(endpoint) {
    return $http.get(apiURL+endpoint);
  };
  var crear = function(endpoint, params) {
    return $http.post(apiURL+endpoint, params);
  };

  var modificar = function(endpoint, params) {
    return $http.put(apiURL+endpoint, params);
  };

  var borrar = function(endpoint){
    return $http.delete(apiURL+endpoint);
  };

  return {
    obtener: obtener,
    crear: crear,
    modificar: modificar,
    borrar: borrar
  };
});
