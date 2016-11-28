'use strict';

describe('Controller: CulturaPerfilCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var CulturaPerfilCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CulturaPerfilCtrl = $controller('CulturaPerfilCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CulturaPerfilCtrl.awesomeThings.length).toBe(3);
  });
});
