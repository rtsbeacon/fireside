angular.module('App')


.controller('EMAILCtrl', function($scope, $state, $ionicUser, $ionicHistory) {
            $scope.data = {};

          //  var oriData = angular.copy($scope.data);

//            $scope.resetForm = function()
  //          {
    //          $scope.data = angular.copy(oriData);
      //        $scope.mainForm.$setPristine();
        //    };

          //  $scope.isDataChanged = function()
        //    {
          //    return !angualr.equals($scope.data, oriData);
          //  };
                        
            $scope.submitEmail = function() {
            console.log("email: " + $scope.data.email + " name: " + $scope.data.firstName + " " + $scope.data.lastName);
      //      $state.go('app.schedule');
          //  };
            
         //   $scope.identifyUser = function() {
       //     console.log('Ionic User: Identifying with Ionic User service');
            
                var user = $ionicUser.get();
                if(!user.user_id) {
            // Set your user_id here, or generate a random one.
                user.user_id = $scope.data.email
                            };
            
            // Add some metadata to your user object.
                angular.extend(user, {
                          name: $scope.data.lastName,
                          firstName: $scope.data.firstName,
                          email: $scope.data.email,
                          bio: 'Nash16EMAIL'
                           });

               // $scope.data = angular.copy(oriData);
               // $scope.mainForm.$setPristine();
            
            // Identify your user with the Ionic User Service
                $ionicUser.identify(user).then(function(){
                                    $scope.identified = true;
                                               $ionicHistory.nextViewOptions({
                                                                             disableBack: true
                                                                             });
                                    $state.go('app.thankyou');
                               //          alert('Identified user ' + user.name + '\n ID ' + user.user_id);
                            });
          };

            
           // };
            
            
});