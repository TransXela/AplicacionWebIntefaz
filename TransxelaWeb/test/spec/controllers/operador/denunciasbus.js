'use strict';

describe('Controller: OperadorDenunciasbusCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var OperadorDenunciasbusCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OperadorDenunciasbusCtrl = $controller('OperadorDenunciasbusCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OperadorDenunciasbusCtrl.awesomeThings.length).toBe(3);
  });
});
