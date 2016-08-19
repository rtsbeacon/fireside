angular.module('App')


.controller('AustinDetailCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
  //var artist = Artists.getArtist($scope.artistId);
  $http.get('http://songchant.com/outlaw/austins.json').success(function(data) {
         console.log(data);
         $scope.austins = data;
     });
  console.log($stateParams.austinId);
   $scope.austin = $stateParams.austinId;
 }])  ;