'use strict';

describe('Controller: OperadorPerfilCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var OperadorPerfilCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OperadorPerfilCtrl = $controller('OperadorPerfilCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OperadorPerfilCtrl.awesomeThings.length).toBe(3);
  });
});
