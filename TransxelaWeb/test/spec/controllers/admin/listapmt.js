'use strict';

describe('Controller: AdminListapmtCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var AdminListapmtCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminListapmtCtrl = $controller('AdminListapmtCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminListapmtCtrl.awesomeThings.length).toBe(3);
  });
});
