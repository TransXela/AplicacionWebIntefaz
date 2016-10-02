'use strict';

describe('Controller: OperadorDenunciasrutaCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var OperadorDenunciasrutaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OperadorDenunciasrutaCtrl = $controller('OperadorDenunciasrutaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OperadorDenunciasrutaCtrl.awesomeThings.length).toBe(3);
  });
});
