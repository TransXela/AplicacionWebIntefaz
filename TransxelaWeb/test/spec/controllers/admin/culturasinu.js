'use strict';

describe('Controller: AdminCulturasinuCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var AdminCulturasinuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminCulturasinuCtrl = $controller('AdminCulturasinuCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminCulturasinuCtrl.awesomeThings.length).toBe(3);
  });
});
