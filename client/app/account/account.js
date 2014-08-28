'use strict';

angular.module('angularFullstackApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('confirm', {
        url: '/confirm',
        templateUrl: 'app/account/confirm/confirm.html',
        controller: 'ConfirmCtrl',
        authenticate: true
      })
      .state('confirmWithCode', {
        url: '/confirm/:confirmToken',
        templateUrl: 'app/account/confirm/confirm.html',
        controller: 'ConfirmCtrl'
      })
      .state('askForPwdReset', {
        url: '/pwdreset',
        templateUrl: 'app/account/pwdreset/pwdreset.html',
        controller: 'PwdResetCtrl',
      })
      .state('resetPwd', {
        url: '/pwdreset/:passwordResetToken',
        templateUrl: 'app/account/pwdreset/pwdreset.html',
        controller: 'PwdResetCtrl'
      });
  });