'use strict';

/**
 * @ngdoc function
 * @name transxelaWebApp.controller:DuenioPrincipalCtrl
 * @description
 * # DuenioPrincipalCtrl
 * Controller of the transxelaWebApp
 */
angular.module('transxelaWebApp').controller('DuenioPrincipalCtrl', function ($scope, $http, $location, $cookies) {
  //$cookies.putObject('user', {"token": 1234, "id": 1, "apiurl": '192.168.1.4'});
  $cookies.putObject('user', {"token": 1234, "id": 1, "apiurl": '127.0.0.1'});
  $scope.idduenio = $cookies.getObject('user').id;
  //$scope.apiurl = 'http://127.0.0.1:8000';
  $scope.apiurl = 'http://'+ $cookies.getObject('user').apiurl +':8000';
  var url = $scope.apiurl + '/duenio/'+$scope.idduenio+'/principal';
  $http.get(url).
  success(function(response, status, headers, config){
    $scope.duenio = response;
  }).
  error(function(response, status, headers, config) {
    // console.log(response);
    // console.log(status);
    // console.log(headers);
    // console.log(config);
    if(status === null || status === -1){
      $location.url('/404');
    }
    else if(status === 401){
      $location.url('/403');
    }
  });
});







// angular.module('transxelaWebApp').service('dataService', ['$http', function ($http) {
//   var urlBase = 'http://127.0.0.1:8000/duenio';
//
//   this.get = function (idduenio, endpoint) {
//     return $http.get(urlBase + '/' + idduenio + '/' + endpoint);
//   };
//
//   this.getCustomer = function (id) {
//     return $http.get(urlBase + '/' + id);
//   };
//
//   this.insertCustomer = function (cust) {
//     return $http.post(urlBase, cust);
//   };
//
//   this.updateCustomer = function (cust) {
//     return $http.put(urlBase + '/' + cust.ID, cust)
//   };
//
//   this.deleteCustomer = function (id) {
//     return $http.delete(urlBase + '/' + id);
//   };
//
//   this.getOrders = function (id) {
//     return $http.get(urlBase + '/' + id + '/orders');
//   };
// }]);
