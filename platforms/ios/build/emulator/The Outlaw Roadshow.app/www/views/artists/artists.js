angular.module('App')


.controller('ArtistsCtrl', ['$scope', '$http', function($scope, $http) {
     $http.get("http://songchant.com/outlaw/artists.json").success(function(data) {
         console.log(data);
         $scope.artists = data;
     });
}]);