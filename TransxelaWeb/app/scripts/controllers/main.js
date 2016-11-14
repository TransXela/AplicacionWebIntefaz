'use strict';

/**
* @ngdoc function
* @name transxelaWebApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the transxelaWebApp
*/
angular.module('transxelaWebApp').controller('MainCtrl', function ($scope, $uibModal, $location, $cookies) {
  if(typeof $cookies.getObject('user') !== 'undefined' && $cookies.getObject('user')){
    switch($cookies.getObject('user').tipo){
      case 'Dueños': {
        $location.url('/duenio/principal');
        break;
      }
      case 'PMT': {
        $location.url('/duenio/principal');
        break;
      }
      case 'Cultura': {
        $location.url('/duenio/principal');
        break;
      }
      case 'Admin': {
        $location.url('/duenio/principal');
        break;
      }
      default: {
        $cookies.remove('user');
      }
    }
  }

  $scope.iniciarSesion = function (size) {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/login.html',
      controller: 'IniciarSesionController',
      size: size
    });

    uibModalInstance.result.then(function (result) {
      var grupo = result.Grupo;
      if(grupo.name === "Dueños"){
        $cookies.putObject('user', {"token": result.Token, id: result.Duenio.idduenio, usuario: result.Duenio, tipo: grupo.name, torcido: result.Usuario.id});
        $location.url('/duenio/principal');
      }
      else if (grupo.name === "Cultura") {
        console.log({"token": result.Token, id: result.Cultura.idcultura, usuario: result.Cultura});
        $cookies.putObject('user', {"token": result.Token, id: result.Cultura.idcultura, usuario: result.Cultura, tipo: grupo.name, torcido: result.Usuario.id});
        $location.url('/cultura/principal');
      }
      else if (grupo.name === "PMT") {
        $cookies.putObject('user', {"token": result.Token, id: result.PMT.idpmt, usuario: result.PMT, tipo: grupo.name, torcido: result.Usuario.id});
        $location.url('/pmt/principal');
      }
      else if (grupo.name === "Admin") {
        $cookies.putObject('user', {"token": result.Token, id: result.Usuario.id, usuario: result.Usuario, tipo: grupo.name});
        $location.url('/admin/principal');
      }
      else {
        $cookies.remove('user');
        $location.url('/login');
      }
    },
    function (status) {
      $cookies.remove('user');
      if(status === '403'){
        $location.url('/403');
      }
      else if(status === '404'){
        $location.url('/login');
      }
      else if(status === '500'){
        $location.url('/400');
      }
    });
  };
});

angular.module('transxelaWebApp').controller('IniciarSesionController', ['$scope', '$uibModalInstance', 'apiService', function ($scope, $uibModalInstance, apiService) {
  $scope.usuario = null;
  $scope.contrasenia = null;
  $scope.close = function () {
    apiService.crear('/obtenertoken/', {user: $scope.usuario, pass: $scope.contrasenia}).
    success(function(response, status, headers, config){
      $uibModalInstance.close(response, 500);
    }).
    error(function(response, status, headers, config) {
      switch(status) {
        case 400: {
          $uibModalInstance.dismiss('404');
          break;
        }
        case 403: {
          $uibModalInstance.dismiss('403');
          break;
        }
        case 404: {
          $uibModalInstance.dismiss('404');
          break;
        }
        default: {
          $uibModalInstance.dismiss('500');
        }
      }
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
// -------------PRINCIPAL-----------------------------------------------------------------------------------------------------------
// Sticky Header
$(window).scroll(function() {
  if ($(window).scrollTop() > 100) {
    $('.main_h').addClass('sticky');
  } else {
    $('.main_h').removeClass('sticky');
  }
});

// Mobile Navigation
$('.mobile-toggle').click(function() {
  if ($('.main_h').hasClass('open-nav')) {
    $('.main_h').removeClass('open-nav');
  } else {
    $('.main_h').addClass('open-nav');
  }
});

$('.main_h li a').click(function() {
  if ($('.main_h').hasClass('open-nav')) {
    $('.navigation').removeClass('open-nav');
    $('.main_h').removeClass('open-nav');
  }
});

// navigation scroll lijepo radi materem
$('nav a').click(function(event) {
  var id = $(this).attr("href");
  var offset = 70;
  var target = $(id).offset().top - offset;
  $('html, body').animate({
    scrollTop: target
  }, 500);
  event.preventDefault();
});
// ---------END PRINCIPAL --------------------------------------------------------------------------------------------------
// -------------DESCARGA-----------------------------------------------------------------------------------------------------------
$(".download").mouseenter(function() {
  $(this).addClass("hover");
});

$(".download").mouseleave(function() {
  $(this).removeClass("hover");
});

// ---------END DESCARGA --------------------------------------------------------------------------------------------------
