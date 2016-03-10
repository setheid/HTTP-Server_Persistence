'use strict';

// How would the use of 'this' change if we used an arrow function here?
var Router = module.exports = function() {
  this.routes = {
    'GET': {},
    'POST': {},
    'PATCH': {},
    'DELETE': {}
  };
};

Router.prototype.route = function() {
  // Using (req, res) because we are using this function as the callback in .createServer()
  return (req, res) => {
    // Is the arrow function messing with 'this' in a special way here?
    var routerFunction = this.routes[req.method][req.url];
    routerFunction(req, res);
  };
};

Router.prototype.get = function(route, callback) {
  // walk through the instantiated router to see how this works
  this.routes.GET[route] = callback;
};

Router.prototype.post = function(route, callback) {
  this.routes.POST[route] = callback;
};

Router.prototype.patch = function(route, callback) {
  this.routes.PATCH[route] = callback;
};

Router.prototype.delete = function(route, callback) {
  this.routes.DELETE[route] = callback;
};
