'use strict';

describe('Controller: CulturaNuevaactividadculturalCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var CulturaNuevaactividadculturalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CulturaNuevaactividadculturalCtrl = $controller('CulturaNuevaactividadculturalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CulturaNuevaactividadculturalCtrl.awesomeThings.length).toBe(3);
  });
});
