'use strict';

describe('Controller: PmtPerfilCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var PmtPerfilCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PmtPerfilCtrl = $controller('PmtPerfilCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PmtPerfilCtrl.awesomeThings.length).toBe(3);
  });
});
