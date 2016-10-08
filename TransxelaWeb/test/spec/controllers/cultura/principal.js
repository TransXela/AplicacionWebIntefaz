'use strict';

describe('Controller: CulturaPrincipalCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var CulturaPrincipalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CulturaPrincipalCtrl = $controller('CulturaPrincipalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CulturaPrincipalCtrl.awesomeThings.length).toBe(3);
  });
});
