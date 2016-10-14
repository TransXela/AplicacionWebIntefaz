'use strict';

describe('Controller: AdminListaCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var AdminListaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminListaCtrl = $controller('AdminListaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminListaCtrl.awesomeThings.length).toBe(3);
  });
});
