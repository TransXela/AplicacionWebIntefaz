'use strict';

describe('Controller: DuenioBusesCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var DuenioBusesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DuenioBusesCtrl = $controller('DuenioBusesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DuenioBusesCtrl.awesomeThings.length).toBe(3);
  });
});
