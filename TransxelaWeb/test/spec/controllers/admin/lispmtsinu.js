'use strict';

describe('Controller: AdminLispmtsinuCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var AdminLispmtsinuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminLispmtsinuCtrl = $controller('AdminLispmtsinuCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminLispmtsinuCtrl.awesomeThings.length).toBe(3);
  });
});
