'use strict';

describe('Controller: DuenioPerfilCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var DuenioPerfilCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DuenioPerfilCtrl = $controller('DuenioPerfilCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DuenioPerfilCtrl.awesomeThings.length).toBe(3);
  });
});
