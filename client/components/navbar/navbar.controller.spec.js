'use strict';

describe('Controller: NavbarCtrl', function () {

  // load the controller's module
  beforeEach(module('angularFullstackApp'));

  var NavbarCtrl, scope, Navbar, Auth;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _Navbar_, _Auth_) {
    scope = $rootScope.$new();
    Navbar = _Navbar_;
    Auth = _Auth_;
    NavbarCtrl = $controller('NavbarCtrl', {
      $scope: scope,
      Auth: Auth,
      Navbar: Navbar
    });
  }));

  it('should attach Auth to the $scope', function () {
    expect(scope.Auth).toEqual(Auth);
  });

  it('should return Navbar(factory)', function() {
    expect(NavbarCtrl).toEqual(Navbar);
  });
});
