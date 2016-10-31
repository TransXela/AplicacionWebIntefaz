'use strict';

describe('Controller: OperadorDenunciasCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var OperadorDenunciasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OperadorDenunciasCtrl = $controller('OperadorDenunciasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OperadorDenunciasCtrl.awesomeThings.length).toBe(3);
  });
});
