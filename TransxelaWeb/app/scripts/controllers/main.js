'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp')
  .controller('MainCtrl', function ($scope, ModalService) {
    $scope.iniciarSesion = function() {
    ModalService.showModal({
      templateUrl: "views/duenio/login.html",
      controller: "IniciarSesionController"
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        console.log(result);
      });
    });
  };
  });

angular.module('transxelaWebApp').controller('IniciarSesionController', ['$scope', '$element', 'close', function($scope, $element, close) {
  $scope.usuario = null;
  $scope.contrasenia = null;
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
    close({
      usuario: $scope.usuario,
      contrasenia: $scope.contrasenia
    }, 500); // close, but give 500ms for bootstrap to animate
  };
  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {
    //  Manually hide the modal.
    $element.modal('hide');
    //  Now call close, returning control to the caller.
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
