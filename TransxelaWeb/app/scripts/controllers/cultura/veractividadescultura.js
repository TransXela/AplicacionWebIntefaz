var myItemsApp = angular.module('transxelaWebApp', []);

myItemsApp.factory('itemsFactory', ['$http', function ($http) {
var itemsFactory = {
    itemDetails: function () {
        return $http({
                url: "pos.json",
                method: "GET"

            })
            .then(function (response) {
                return response.data;
                console.log(response.data);
            });
    }
};
return itemsFactory;

}]);




 myItemsApp.controller('ItemsController', ['$scope', 'itemsFactory', function ($scope, itemsFactory) {
var promise = itemsFactory.itemDetails();

promise.then(function (data) {
    $scope.itemDetails = data;
    console.log(data);
});
$scope.select = function (item) {
    $scope.selected = item;
};
$scope.selected = {};

$scope.selected.latitude;
 }]);


 myItemsApp.directive("myMaps", function ($timeout) {
return {
    restrict: 'E',
    template: '<div></div>',
    replace: true,
    link: function (scope, element, attrs) {
        scope.$watchCollection('selected', function () {
            var lat = scope.selected.latitude;
            var lon = scope.selected.longitude;

            var myLatLng = new google.maps.LatLng(lat, lon);
            var mapOptions = {
                center: myLatLng,
                zoom: 12,
                myTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: "my town"
            });
            marker.setMap(map);
        });

    }
};
 });
