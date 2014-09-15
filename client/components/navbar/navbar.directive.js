'use strict';

angular.module('angularFullstackApp')
  .directive('navbar', function () {
    return {
   	  controller: 'NavbarCtrl',
      controllerAs: 'Navbar',
      templateUrl: 'components/navbar/navbar.html',
      restrict: 'EA'
    };
  });