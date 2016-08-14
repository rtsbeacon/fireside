angular.module('App')


.controller('AustinsCtrl', ['$scope', '$http', function($scope, $http) {
     $http.get("https://secure.rcomhost.com/songchant.com/outlaw/austins.json").success(function(data) {
         console.log(data);
         $scope.austins = data;
     });
}]);