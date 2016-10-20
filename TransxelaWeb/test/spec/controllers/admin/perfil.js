'use strict';

describe('Controller: AdminPerfilCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var AdminPerfilCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminPerfilCtrl = $controller('AdminPerfilCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminPerfilCtrl.awesomeThings.length).toBe(3);
  });
});
