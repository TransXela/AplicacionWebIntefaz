'use strict';

describe('Controller: OperadorPrincipalCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var OperadorPrincipalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OperadorPrincipalCtrl = $controller('OperadorPrincipalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OperadorPrincipalCtrl.awesomeThings.length).toBe(3);
  });
});
