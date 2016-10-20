'use strict';

describe('Controller: PmtPrincipalCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var PmtPrincipalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PmtPrincipalCtrl = $controller('PmtPrincipalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PmtPrincipalCtrl.awesomeThings.length).toBe(3);
  });
});
