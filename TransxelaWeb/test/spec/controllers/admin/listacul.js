'use strict';

describe('Controller: AdminListaculCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var AdminListaculCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminListaculCtrl = $controller('AdminListaculCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminListaculCtrl.awesomeThings.length).toBe(3);
  });
});
