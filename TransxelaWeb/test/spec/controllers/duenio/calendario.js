'use strict';

describe('Controller: DuenioCalendarioCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var DuenioCalendarioCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DuenioCalendarioCtrl = $controller('DuenioCalendarioCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DuenioCalendarioCtrl.awesomeThings.length).toBe(3);
  });
});
