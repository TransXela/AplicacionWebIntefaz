'use strict';

describe('Controller: AdminUsuariosCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var AdminUsuariosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminUsuariosCtrl = $controller('AdminUsuariosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminUsuariosCtrl.awesomeThings.length).toBe(3);
  });
});
