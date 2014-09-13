'use strict';

describe('Directive: loginForm', function () {

  // load the directive's module and view
  beforeEach(module('angularFullstackApp'));
  beforeEach(module('components/loginForm/loginForm.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<login-form></login-form>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the loginForm directive');
  }));
});