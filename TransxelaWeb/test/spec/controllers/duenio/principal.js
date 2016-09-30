'use strict';

describe('Controller: DuenioPrincipalCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var DuenioPrincipalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DuenioPrincipalCtrl = $controller('DuenioPrincipalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DuenioPrincipalCtrl.awesomeThings.length).toBe(3);
  });
});
