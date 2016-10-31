'use strict';

describe('Controller: AdminListausuariosCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var AdminListausuariosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminListausuariosCtrl = $controller('AdminListausuariosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminListausuariosCtrl.awesomeThings.length).toBe(3);
  });
});
