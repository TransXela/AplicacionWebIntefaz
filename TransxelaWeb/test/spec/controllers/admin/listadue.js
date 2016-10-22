'use strict';

describe('Controller: AdminListadueCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var AdminListadueCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminListadueCtrl = $controller('AdminListadueCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminListadueCtrl.awesomeThings.length).toBe(3);
  });
});
