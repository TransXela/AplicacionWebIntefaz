'use strict';

describe('Controller: PmtDueniosCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var PmtDueniosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PmtDueniosCtrl = $controller('PmtDueniosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PmtDueniosCtrl.awesomeThings.length).toBe(3);
  });
});
