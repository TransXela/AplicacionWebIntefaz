'use strict';

describe('Controller: DuenioHorariosCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var DuenioHorariosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DuenioHorariosCtrl = $controller('DuenioHorariosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DuenioHorariosCtrl.awesomeThings.length).toBe(3);
  });
});
