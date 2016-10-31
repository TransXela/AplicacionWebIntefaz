'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('MainCtrl', function ($scope, $uibModal, $location, $cookies) {
  $scope.iniciarSesion = function (size) {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/login.html',
      controller: 'IniciarSesionController',
      size: size
    });

    uibModalInstance.result.then(function (result) {
      var grupo = result.Grupo;
      if(grupo.name === "Dueños"){
        $cookies.putObject('user', {"token": result.Token, id: result.Duenio.idduenio, usuario: result.Duenio});
        $location.url('/duenio/principal');
      }
      else if (grupo.name === "Cultura") {
        console.log({"token": result.Token, id: result.Cultura.idcultura, usuario: result.Cultura});
        $cookies.putObject('user', {"token": result.Token, id: result.Cultura.idcultura, usuario: result.Cultura});
        $location.url('/cultura/principal');
      }
      else if (grupo.name === "PMT") {
        $cookies.putObject('user', {"token": result.Token, id: result.PMT.idpmt, usuario: result.PMT});
        $location.url('/pmt/principal');
      }
      else if (grupo.name === "Admin") {
        $cookies.putObject('user', {"token": result.Token, usuario: result.Usuario});
        $location.url('/admin/principal');
      }
      else {
        $cookies.remove('user');
        $location.url('/');
      }
    }, function (status) {
      if(status === 'error'){
        $cookies.remove('user');
        $location.url('/login');
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
      $uibModalInstance.dismiss('error');
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
