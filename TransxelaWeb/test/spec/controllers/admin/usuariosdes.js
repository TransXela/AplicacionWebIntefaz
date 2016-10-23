'use strict';

describe('Controller: AdminUsuariosdesCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var AdminUsuariosdesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminUsuariosdesCtrl = $controller('AdminUsuariosdesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminUsuariosdesCtrl.awesomeThings.length).toBe(3);
  });
});
