'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:CulturaPrincipalCtrl
 * @description
 * # CulturaPrincipalCtrl
 * Controller of the transxelaWebApp
 */
 // Create an application module for our demo.
 angular.module('transxelaWebApp').controller('PopupDemoCont', ['$scope','$uibModal',function ($scope, $uibModal) {
$scope.open = function () {
console.log('opening pop up');
var uibModalInstance = $uibModal.open({
templateUrl: 'views/cultura/nuevaactividadcultural.html',
controller:'PopupCont'
});


}
}]);

angular.module('transxelaWebApp').controller('PopupCont',function ($scope, $uibModalInstance) {
$scope.close = function () {
$uibModalInstance.dismiss('cancel');
};
});
