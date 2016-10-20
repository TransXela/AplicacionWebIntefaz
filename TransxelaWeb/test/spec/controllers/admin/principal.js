'use strict';

describe('Controller: AdminPrincipalCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var AdminPrincipalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminPrincipalCtrl = $controller('AdminPrincipalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminPrincipalCtrl.awesomeThings.length).toBe(3);
  });
});
