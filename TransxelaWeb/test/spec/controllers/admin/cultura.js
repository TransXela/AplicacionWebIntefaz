'use strict';

describe('Controller: AdminCulturaCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var AdminCulturaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminCulturaCtrl = $controller('AdminCulturaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminCulturaCtrl.awesomeThings.length).toBe(3);
  });
});
