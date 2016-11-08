'use strict';

describe('Controller: DuenioCalendariopilotoCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var DuenioCalendariopilotoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DuenioCalendariopilotoCtrl = $controller('DuenioCalendariopilotoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DuenioCalendariopilotoCtrl.awesomeThings.length).toBe(3);
  });
});
