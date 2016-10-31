'use strict';

describe('Controller: AdminDueniosinuCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var AdminDueniosinuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminDueniosinuCtrl = $controller('AdminDueniosinuCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminDueniosinuCtrl.awesomeThings.length).toBe(3);
  });
});
