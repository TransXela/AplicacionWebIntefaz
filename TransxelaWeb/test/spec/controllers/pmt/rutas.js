'use strict';

describe('Controller: PmtRutasCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var PmtRutasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PmtRutasCtrl = $controller('PmtRutasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PmtRutasCtrl.awesomeThings.length).toBe(3);
  });
});
