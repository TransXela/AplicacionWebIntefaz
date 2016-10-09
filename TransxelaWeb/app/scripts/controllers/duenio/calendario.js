'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioCalendarioCtrl
 * @description
 * # DuenioCalendarioCtrl
 * Controller of the transxelaWebApp
 */

angular.module('transxelaWebApp').controller('DuenioCalendarioCtrl', function($scope, ModalService) {
    $scope.show = function() {
        ModalService.showModal({
            templateUrl: 'modal.html',
            controller: "ModalController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.message = "You said " + result;
            });
        });
    };
  $scope.showComplex = function() {
    ModalService.showModal({
      templateUrl: "complex.html",
      controller: "ComplexController",
      inputs: {
        title: "A More Complex Example",
        option: "Ok"
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.complexResult  = "Name: " + result.name + ", age: " + result.age;
      });
    });
  };

});

angular.module('transxelaWebApp').controller('ModalController', function($scope, close) {
 $scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };

});
angular.module('transxelaWebApp').controller('ComplexController', ['$scope', '$element', 'title', 'option', 'close', function($scope, $element, title, option, close) {
  $scope.name = null;
  $scope.age = null; 
  $scope.title = title;
  $scope.option = option;
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
 	  close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {
    //  Manually hide the modal.
    $element.modal('hide');
    //  Now call close, returning control to the caller.
    close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
  };
}]);