angular.module('App')


.controller('AustinsCtrl', ['$scope', '$http', function($scope, $http) {
     $http.get("http://songchant.com/outlaw/austins.json").success(function(data) {
         console.log(data);
         $scope.austins = data;
     });
}]);