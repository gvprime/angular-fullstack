'use strict';

angular.module('angularFullstackApp')
  .directive('loginForm', function (Auth, $location, $window) {
    return {
      templateUrl: 'components/loginForm/loginForm.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	scope.user = {};
	    scope.errors = {};

	    scope.login = function(form) {
	      scope.submitted = true;

	      if(form.$valid) {
	        Auth.login({
	          email: scope.user.email,
	          password: scope.user.password
	        })
	        .then( function() {
	          // Logged in, redirect to home
	          $location.path('/');
	        })
	        .catch( function(err) {
	          scope.errors.other = err.message;
	        });
	      }
	    };

	    scope.loginOauth = function(provider) {
	      $window.location.href = '/auth/' + provider;
	    };
      }
    };
  });