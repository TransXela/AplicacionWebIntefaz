'use strict';

describe('Controller: DuenioEstadisticasCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var DuenioEstadisticasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DuenioEstadisticasCtrl = $controller('DuenioEstadisticasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DuenioEstadisticasCtrl.awesomeThings.length).toBe(3);
  });
});
