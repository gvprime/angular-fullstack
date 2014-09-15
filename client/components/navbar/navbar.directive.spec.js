'use strict';

describe('Directive: navbar', function () {

  // load the directive's module and view
  beforeEach(module('angularFullstackApp'));
  beforeEach(module('components/navbar/navbar.html'));
  beforeEach(module('stateMock'));

  var element,
      scope,
      state,
      NavbarCtrl,
      isLoggedIn,
      isAdmin;

  var logIn = function(s, a) {
    if (a) {
      isAdmin = true;
    }
    isLoggedIn = true;
    s.$apply();
  };

  var shown = function(ref) {
    return 'li:not(.ng-hide) a[ui-sref="' + ref + '"]';
  };
  var hidden = function(ref) {
    return 'li.ng-hide a[ui-sref="' + ref + '"]';
  };

  beforeEach(function() {
    module('testFullstackApp', function($provide, $controllerProvider) {
      isLoggedIn = isAdmin = false;

      $provide.factory('Navbar', function(){
        return {
          isCollapsed: true,
          menu: [{
            title: 'Home',
            state: 'main'
          }, {
            title: 'Blog',
            state: 'blog'
          }, {
            title: 'Contact us',
            state: 'contact'
          }]
        };
      });

      $controllerProvider.register('NavbarCtrl', function(Navbar, $scope) {
        $scope.Auth = {
          isLoggedIn: function() {
            return isLoggedIn;
          },
          isAdmin: function() {
            return isAdmin;
          },
          getCurrentUser: function() {
            if (isAdmin) {
              return {
                name: 'Admin User',
                email: 'admin@admin.com',
                role: 'admin'
              }
            }
            else if (isLoggedIn) {
              return {
                name: 'Test User',
                email: 'test@test.com',
                role: 'user'
              };
            } else {
              return {};
            }
          }
        }

        return Navbar;
      });
    });
  });

  beforeEach(inject(function ($rootScope, $compile, $state) {
    scope = $rootScope.$new();
    state = $state;
    element = angular.element('<navbar></navbar>');
    element = $compile(element)(scope);
    scope.$apply();
    NavbarCtrl = element.controller('navbar');

    //state.expectTransitionTo('main');
  }));

  it('should make as many menu items as there are items in NavbarCtrl.menu', function () {
    expect(element.find('li[ng-repeat="item in Navbar.menu"]').length)
      .toBe(NavbarCtrl.menu.length);
  });

  it('should SHOW "Login" when logged out, and HIDE "Login" when logged in', function() {
    expect(element.find(shown('login')).length).toBe(1);
    expect(element.find(hidden('login')).length).toBe(0);

    logIn(scope);

    expect(element.find(shown('login')).length).toBe(0);
    expect(element.find(hidden('login')).length).toBe(1);
  });

  it('should SHOW "Sign up" when logged out, and HIDE "Sign up" when logged in', function() {
    expect(element.find(shown('signup')).length).toBe(1);
    expect(element.find(hidden('signup')).length).toBe(0);

    logIn(scope);

    expect(element.find(shown('signup')).length).toBe(0);
    expect(element.find(hidden('signup')).length).toBe(1);
  });

  it('should HIDE "Logout" when logged out, and SHOW "Logout" when logged in', function() {
    expect(element.find(shown('logout')).length).toBe(0);
    expect(element.find(hidden('logout')).length).toBe(1);

    logIn(scope);

    expect(element.find(shown('logout')).length).toBe(1);
    expect(element.find(hidden('logout')).length).toBe(0);
  });

  it('should HIDE "Settings" when logged out, and SHOW "Settings" when logged in', function() {
    expect(element.find(shown('settings')).length).toBe(0);
    expect(element.find(hidden('settings')).length).toBe(1);

    logIn(scope);

    expect(element.find(shown('settings')).length).toBe(1);
    expect(element.find(hidden('settings')).length).toBe(0);
  });

  it('should HIDE "Admin" when logged out, and SHOW "Admin" when logged in as "admin"', function() {
    expect(element.find(shown('admin')).length).toBe(0);
    expect(element.find(hidden('admin')).length).toBe(1);

    logIn(scope);

    expect(element.find(shown('admin')).length).toBe(0);
    expect(element.find(hidden('admin')).length).toBe(1);

    logIn(scope, true);

    expect(element.find(shown('admin')).length).toBe(1);
    expect(element.find(hidden('admin')).length).toBe(0);
  });

  it('should expand when the navbar button is clicked, and collapse when clicked again', function() {
    var isCollapsed = NavbarCtrl.isCollapsed;

    element.find('button.navbar-toggle').click();
    expect(NavbarCtrl.isCollapsed).not.toBe(isCollapsed);

    element.find('button.navbar-toggle').click();
    expect(NavbarCtrl.isCollapsed).toBe(isCollapsed);
  });
});