// home.js
// This is the controller that handles the main view when the user is successfully logged in.
// The account currently logged in can be accessed through localStorage.account.
// The authenticated user can be accessed through firebase.auth().currentUser.
'Use Strict';
angular.module('App').controller('homeController', function($scope, $state, $localStorage, Popup, Firebase, $firebaseObject) {
  $scope.$on('$ionicView.enter', function() {
    //Check if there's an authenticated user, if there is non, redirect to login.
    if(firebase.auth().currentUser) {
      $scope.loggedIn = true;
    } else {
      $scope.loggedIn = false;
      $state.go('login');
    }

    if(!$localStorage.isGuest) {
      //Authentication details.
      console.log("Firebase Auth: " + JSON.stringify(firebase.auth().currentUser));
      console.log($localStorage.accountId);
      //Retrieve Account details using AngularFire.
      var account = Firebase.getById('accounts', $localStorage.accountId);
      account.$loaded().then(function() {
        //Set the variables to be shown on home.html
        $scope.email = account.email;
        $scope.provider = account.provider;
      });
    } else {
      //Logged in user is previously logged in as guest. Set variables to Guest variables.
      console.log("Firebase Auth: " + JSON.stringify(firebase.auth().currentUser));
      $scope.email = "Guest";
      $scope.provider = "Firebase";
      $scope.loggedIn = true;
    }
  })

  $scope.logout = function() {
    if (firebase.auth()) {
      firebase.auth().signOut().then(function() {
        //Clear the saved credentials.
        $localStorage.$reset();
        $scope.loggedIn = false;
        //Proceed to login screen.
        $state.go('login');
      }, function(error) {
        //Show error message.
        Utils.message(Popup.errorIcon, Popup.errorLogout);
      });
    }
  };
});
