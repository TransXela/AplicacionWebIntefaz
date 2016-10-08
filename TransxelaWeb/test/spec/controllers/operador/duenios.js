'use strict';

describe('Controller: OperadorDueniosCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var OperadorDueniosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OperadorDueniosCtrl = $controller('OperadorDueniosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OperadorDueniosCtrl.awesomeThings.length).toBe(3);
  });
});
