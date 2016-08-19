'Use Strict';
angular.module('App', ['ionic', 'ngStorage', 'ngCordovaOauth', 'firebase'])
  // AngularFire Modules:
  // all('table_name') -> get all data where table_name is the name of the table in Firebase Database. Returns $firebaseArray.
  // getById('table_name', 'id') -> get an object from table_name given the id. Returns $firebaseObject.
  // get('table_name', 'field', 'value') -> get an object from table_name where field is equal to value. Returns $firebaseObject.
  // Feel free to expand these functionality based your app's requirements.
  .factory('Firebase', function($firebaseArray, $firebaseObject) {
    var ref = firebase.database().ref();
    return {
      all: function(section) {
        var data = $firebaseArray(ref.child(section));
        return data;
      },
      getById: function(section, id) {
        var data = $firebaseObject(ref.child(section).child(id));
        return data;
      },
      get: function(section, field, value) {
        var data = $firebaseArray(ref.child(section).orderByChild(field).equalTo(value));
        return data;
      }
    };
  })
  // For Facebook:
  // Make sure you have enabled Facebook as a Sign-In Method at your app's Firebase Console, insert your App ID and App Secret found from your Facebook app at https://developers.facebook.com.
  // Add http://localhost/callback as Valid OAuth redirect URIs at your Facebook Login Settings of your Facebook app.

// For Google:
// Make sure you have enabled Google as a Sign-In Method at your app's Firebase Console.
// GoogleWebClientId can be found from your Firebase Console, under GoogleSignIn.
// Add http://localhost/callback at your API Credentials for the app at https://console.developers.google.com/apis. Note that this is different from the Firebase OAuth Redirect Console.

// For Twitter:
// Make sure you have enabled Twitter as a Sign-In Method at your app's Firebase Console, insert your App ID and App Secret found from your Twitter app at https://apps.twitter.com.
// Make sure you have added http://127.0.0.1:8080/callback as a Callback URL on your app at https://apps.twitter.com
// Note that Twitter Login DOES NOT WORK when you have livereload (-ls) enabled on your ionic app.
.constant('Social', {
    facebookAppId: "1025234637591184",
   // googleWebClientId: "86899339460-kqrko1uuhu9a532l9f0jdhf9tgnp8b00.apps.googleusercontent.com",
   // twitterKey: "aJWByCgPhUgYZJMojyFeH2h8F",
   // twitterSecret: "XxqKHi6Bq3MHWESBLm0an5ndLxPYQ2uzLtIDy6f9vgKKc9kemI"
  })
  //Constants for the Popup messages
  //For the icons, refer to http://ionicons.com for all icons.
  //Here you can edit the success and error messages on the popups.
  .constant('Popup', {
    delay: 3000, //How long the popup message should show before disappearing (in milliseconds -> 3000 = 3 seconds).
    successIcon: "ion-happy-outline",
    errorIcon: "ion-sad-outline",
    accountCreateSuccess: "Congratulations! Your account has been created. Logging you in.",
    emailAlreadyExists: "Sorry, but an account with that email address already exists. Please register with a different email and try again.",
    accountAlreadyExists: "Sorry, but an account with the same credential already exists. Please check your account and try again.",
    emailNotFound: "Sorry, but we couldn\'t find an account with that email address. Please check your email and try again.",
    userNotFound: "Sorry, but we couldn\'t find a user with that account. Please check your account and try again.",
    invalidEmail: "Sorry, but you entered an invalid email. Please check your email and try again.",
    notAllowed: "Sorry, but registration is currently disabled. Please contact support and try again.",
    serviceDisabled: "Sorry, but logging in with this service is current disabled. Please contact support and try again.",
    wrongPassword: "Sorry, but the password you entered is incorrect. Please check your password and try again.",
    accountDisabled: "Sorry, but your account has been disabled. Please contact support and try again.",
    weakPassword: "Sorry, but you entered a weak password. Please enter a stronger password and try again.",
    errorRegister: "Sorry, but we encountered an error registering your account. Please try again later.",
    passwordReset: "A password reset link has been sent to: ",
    errorPasswordReset: "Sorry, but we encountered an error sending your password reset email. Please try again later.",
    errorLogout: "Sorry, but we encountered an error logging you out. Please try again later.",
    sessionExpired: "Sorry, but the login session has expired. Please try logging in again.",
    errorLogin: "Sorry, but we encountered an error logging you in. Please try again later.",
    welcomeBack: "Welcome back! It seems like you should still be logged in. Logging you in now.",
    manyRequests: "Sorry, but we\'re still proccessing your previous login. Please try again later."
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login/login.html',
        controller: 'loginController'
      })
      .state('login2', {
        url: '/login2',
        templateUrl: 'views/login/login2.html',
        controller: 'loginController'
      })
      .state('forgotPassword', {
        url: '/forgotPassword',
        templateUrl: 'views/forgotPassword/forgotPassword.html',
        controller: 'forgotPasswordController'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/register/register.html',
        controller: 'registerController'
      })
      .state('completeAccount', {
        url: '/completeAccount',
        templateUrl: 'views/completeAccount/completeAccount.html',
        controller: 'completeAccountController'
      })
        .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "views/menu/menu.html",
        controller: 'MenuCtrl',
      })
      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'views/home/home.html',
            controller: 'homeController'
          }
        }
      })

      .state('app.news', {
        url: "/news",
        views: {
          'menuContent': {
            templateUrl: "views/news/news.html",
            controller: 'NewsCtrl',
          }
        }
      })
      .state('app.email', {
               url: "/email",
               views: {
               'menuContent': {
               templateUrl: "views/email/email.html",
               controller: 'EMAILCtrl',
               }
            }
    })

  .state('app.thankyou', {
        url: "/thankyou",
        views: {
          'menuContent': {
            templateUrl: "views/email/thankyou.html",
            controller: 'EMAILCtrl',
           }
        }
   })
    .state('app.sponsors', {
    url: "/sponsors",
    views: {
      'menuContent': {
        templateUrl: "views/sponsors/sponsors.html",
        controller: 'SponsorsCtrl',
        }
      }
    })
  .state('app.schedule', {
    url: "/schedule",
    views: {
      'menuContent': {
        templateUrl: "views/schedule/schedule.html",
        controller: 'ArtistsCtrl',
        }
      }
    })
.state('app.stage', {
      url: "/stage",
      views: {
        'menuContent': {
          templateUrl: "views/stage/stage.html",
          controller: 'ArtistsCtrl',
        }
      }
  })
    .state('app.artists', {
      url: "/artists",
      views: {
        'menuContent': {
          templateUrl: "views/artists/artists.html",
          controller: 'ArtistsCtrl',
       }
      }
    })

  .state('app.austins', {
    url: "/austins",
    views: {
      'menuContent': {
        templateUrl: "views/austins/austins.html",
    controller: 'AustinsCtrl',
        }
      }
    })

  .state('app.artist-detail', {
      url: '/artists/:artistId',
      views: {
       'menuContent': {
         templateUrl: 'views/artist-detail/artist-detail.html',
         controller: 'ArtistDetailCtrl', 
    //controller: function ($scope, $stateParams) {
      //console.log($stateParamas),
        // $scope.artistId = $stiateParams.artistId;
     //}
  }
    }
  })

    .state('app.austin-detail', {
      url: '/austins/:austinId',
      views: {
       'menuContent': {
         templateUrl: 'views/austin-detail/austin-detail.html',
         controller: 'AustinDetailCtrl', 
        // console.log($stateParams.austinId),
   // controller: function ($scope, $stateParams) {
      //   console.log($stateParams.austinId),
      //    $scope.austinId = $stateParams.austinId;
     //}
  }
    }
  })
    $urlRouterProvider.otherwise("/login");
   // $urlRouterProvider.otherwise('/app/news');
  })
  //Disables the back button of Android from activating on the Home screen to return back to Login view. Pressing back on Home Screen now closes the app.
 // .run(['$rootScope', '$ionicPlatform', '$state', '$ionicHistory',
 //   function($rootScope, $ionicPlatform, $state, $ionicHistory) {
 //     $ionicPlatform.registerBackButtonAction(function(e) {
 //       if ($state.current.name == 'app.home') {
 //         ionic.Platform.exitApp();
 //       } else if ($state.current.name == 'login') {
 //         ionic.Platform.exitApp();
 //       } else if ($ionicHistory.backView()) {
 //         $ionicHistory.goBack();
 //       }
 //       e.preventDefault();
 //       return false;
//    }, 101);
 //   }
 // ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
     var push = new Ionic.Push({
      "debug": true
    });

    push.register(function(token) {
      console.log("Device token:",token.token);
      push.saveToken(token);  // persist the token in the Ionic Platform
    });   
  });
})







