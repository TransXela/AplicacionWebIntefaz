'use strict';

describe('Controller: PmtHorariospilotoCtrl', function () {

  // load the controller's module
  beforeEach(module('transxelaWebApp'));

  var PmtHorariospilotoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PmtHorariospilotoCtrl = $controller('PmtHorariospilotoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PmtHorariospilotoCtrl.awesomeThings.length).toBe(3);
  });
});
