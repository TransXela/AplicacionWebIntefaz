'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('MainCtrl', function ($scope, $uibModal) {
  $scope.iniciarSesion = function (size) {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'views/login.html',
      controller: 'IniciarSesionController',
      size: size
    });

    uibModalInstance.result.then(function (result) {
      console.log(result);
    }, function () {
     console.log('Modal dismissed at: ' + new Date());
    });
  };
});

angular.module('transxelaWebApp').controller('IniciarSesionController', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
  $scope.usuario = null;
  $scope.contrasenia = null;
  $scope.close = function () {
    $uibModalInstance.close({
      usuario: $scope.usuario,
      contrasenia: $scope.contrasenia
    }, 500);
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
