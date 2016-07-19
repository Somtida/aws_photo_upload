'use strict';

var app = angular.module('myApp', ['ui.router', 'ngCookies', 'oitozero.ngSweetAlert', 'ngFileUpload']);

app.constant('TOKENNAME', 'authtoken');

app.run(function(User) {
  User.readToken();
});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/html/home.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: '/html/loginregister.html',
      controller: 'loginRegisterCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/html/loginregister.html',
      controller: 'loginRegisterCtrl'
    })

    .state('photo', {
      url: '/photo',
      templateUrl: '/html/photo.html',
      controller: 'photoCtrl'
    })


    .state('profile', {
      url: '/profile',
      templateUrl: '/html/profile.html',
      controller: 'profileCtrl',
      resolve: {
        CurrentUser: function(User) {
          return User.getProfile();
        }
      }
    })

    .state('upload', {
      url: '/upload',
      templateUrl: '/html/upload.html',
      controller: 'uploadCtrl',
      resolve: {
        CurrentUser: function(User) {
          return User.getProfile();
        }
      }
    })



  $urlRouterProvider.otherwise('/');
});
