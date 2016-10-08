'use strict';

describe('Controller: OperadorEstadisticasCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var OperadorEstadisticasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OperadorEstadisticasCtrl = $controller('OperadorEstadisticasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OperadorEstadisticasCtrl.awesomeThings.length).toBe(3);
  });
});
