'use strict';

angular.module('angularFullstackApp')
  .controller('NavbarCtrl', function ($scope, Navbar, Auth) {
    $scope.Auth = Auth;

    return Navbar;
  });

