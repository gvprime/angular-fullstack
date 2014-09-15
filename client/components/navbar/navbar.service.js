'use strict';

angular.module('angularFullstackApp')
  .factory('Navbar', function () {
    // Navbar model
    return {
      isCollapsed: false,
      menu: [{
        'title': 'Home',
        'state': 'main'
      }]
    };
  });
