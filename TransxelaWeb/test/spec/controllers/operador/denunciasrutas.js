'use strict';

describe('Controller: OperadorDenunciasrutasCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var OperadorDenunciasrutasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OperadorDenunciasrutasCtrl = $controller('OperadorDenunciasrutasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OperadorDenunciasrutasCtrl.awesomeThings.length).toBe(3);
  });
});
