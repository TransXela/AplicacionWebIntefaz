'use strict';

describe('Controller: AdminUsuarioscrudCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var AdminUsuarioscrudCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminUsuarioscrudCtrl = $controller('AdminUsuarioscrudCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminUsuarioscrudCtrl.awesomeThings.length).toBe(3);
  });
});
