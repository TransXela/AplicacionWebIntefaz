'use strict';

describe('Controller: OperadorDenunciastipoCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var OperadorDenunciastipoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OperadorDenunciastipoCtrl = $controller('OperadorDenunciastipoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OperadorDenunciastipoCtrl.awesomeThings.length).toBe(3);
  });
});
