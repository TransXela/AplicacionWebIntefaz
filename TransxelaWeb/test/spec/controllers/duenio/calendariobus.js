'use strict';

describe('Controller: DuenioCalendariobusCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var DuenioCalendariobusCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DuenioCalendariobusCtrl = $controller('DuenioCalendariobusCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DuenioCalendariobusCtrl.awesomeThings.length).toBe(3);
  });
});
