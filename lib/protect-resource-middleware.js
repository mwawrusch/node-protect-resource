(function() {
  var protectResourceMiddleware, _;

  _ = require('underscore');

  /*
  Middledware used to protect a resource. It requires that a logged on user
  is present, otherwise we redirect to root
  
  @todo
  Set flash info message in case we need to log in.
  
  @example
  
  protectResourceMiddleware = require ('protect-resource').protectResourceMiddleware
  
  Protects all routes at /settings and below. Does not impose roles requirements
  app.get '/settings/?*',protectResourceMiddleware(),  @index
  
  Protects all routes at /admin and below, requires the user to be of type admin.
  app.get '/admin/?*',protectResourceMiddleware( roles : ['admin']),  @index
  
  you can use opts.redirectPath to specify a path to return too, otherwise the referer is used.
  */


  module.exports = protectResourceMiddleware = function(opts) {
    var fn;
    if (opts == null) {
      opts = {};
    }
    fn = function(req, res, next) {
      var isAuthorized, role, _i, _len, _ref;
      isAuthorized = !!req.user;
      if (isAuthorized && opts.roles && _.isArray(opts.roles)) {
        _ref = opts.roles;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          role = _ref[_i];
          if (!_.contains(req.user.roles, role)) {
            isAuthorized = false;
          }
        }
      }
      if (!isAuthorized) {
        res.format({
          html: function() {
            var nextPage;
            nextPage = opts.redirectPath || req.url;
            if (req.flash) {
              req.flash('error', 'You are not authorized to access this page - sorry.');
            }
            res.cookie('post-login-page', nextPage, {
              maxAge: 60 * 60 * 1000,
              httpOnly: true
            });
            return res.redirect("/users/sign-in");
          },
          json: function() {
            return res.json(401, {
              message: "You are not authorized to access this page - sorry.",
              errors: []
            });
          }
        });
        return;
      }
      return next();
    };
    return fn;
  };

}).call(this);

/*
//@ sourceMappingURL=protect-resource-middleware.js.map
*/