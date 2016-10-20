'use strict';

describe('Controller: PmtHorariosCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var PmtHorariosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PmtHorariosCtrl = $controller('PmtHorariosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PmtHorariosCtrl.awesomeThings.length).toBe(3);
  });
});
