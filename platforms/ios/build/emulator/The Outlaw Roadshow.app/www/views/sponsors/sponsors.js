angular.module('App')


.controller('SponsorsCtrl', ['$scope', '$http', function($scope, $http) {
     $http.get("http://songchant.com/outlaw/sponsors.json").success(function(data) {
         console.log(data);
         $scope.sponsors = data;
     });
}]);