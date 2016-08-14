// register.js
// This is the controller that handles the registration of the user through Firebase.
// When the user is done registering, the user is automatically logged in.
'Use Strict';
angular.module('App').controller('registerController', function($scope, $state, $localStorage, Utils, Popup, Firebase) {
  $scope.$on('$ionicView.enter', function() {
    //Clear the Registration Form.
    $scope.user = {
      email: '',
      password: ''
    };
  })

  $scope.register = function(user) {
    //Check if form is filled up.
    if (angular.isDefined(user)) {
      Utils.show();
      //Check if an account with the same email already exists.
      var account = Firebase.get('accounts', 'email', user.email);
      account.$loaded().then(function() {
        //Account with same email already exists.
        if (account.length > 0) {
          Utils.message(Popup.errorIcon, Popup.emailAlreadyExists);
        } else {
          //Account doesn't exist yet, proceed to insert account data to database.
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(function() {
              //Get Firebase reference to add accounts database.
              var accounts = Firebase.all('accounts');
              accounts.$add({
                email: user.email,
                userId: firebase.auth().currentUser.uid,
                dateCreated: Date(),
                provider: 'Firebase'
              }).then(function(ref) {
                //Account created successfully, logging user in automatically after a short delay.
                Utils.message(Popup.successIcon, Popup.accountCreateSuccess)
                  .then(function() {
                    $localStorage.email = user.email;
                    $localStorage.password = user.password;
                    setAccountAndLogin(ref.key);
                  })
                  .catch(function() {
                    //User closed the prompt, proceed immediately to login.
                    $localStorage.email = user.email;
                    $localStorage.password = user.password;
                    setAccountAndLogin(ref.key);
                  });
              });
            })
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              //Show error message.
              console.log(errorCode);
              switch (errorCode) {
                case 'auth/email-already-in-use':
                  Utils.message(Popup.errorIcon, Popup.emailAlreadyExists);
                  break;
                case 'auth/invalid-email':
                  Utils.message(Popup.errorIcon, Popup.invalidEmail);
                  break;
                case 'auth/operation-not-allowed':
                  Utils.message(Popup.errorIcon, Popup.notAllowed);
                  break;
                case 'auth/weak-password':
                  Utils.message(Popup.errorIcon, Popup.weakPassword);
                  break;
                default:
                  Utils.message(Popup.errorIcon, Popup.errorRegister);
                  break;
              }
            });
        }
      });
    }
  };

  //Function to set the accountId from the Firebase database and store it on $localStorage.accountId.
  setAccountAndLogin = function(key) {
    $localStorage.accountId = key;
    $localStorage.loginProvider = "Firebase";
    $state.go('app.home');
  };

});
