angular.module('App')


.controller('MenuCtrl', ['$scope', '$http', function($scope, $http) {
     $http.get("http://songchant.com/outlaw/menus.json").success(function(data) {
         console.log(data);
         $scope.menus = data;
     });
}]);