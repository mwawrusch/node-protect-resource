/*
Complimentary module to protectResourceMiddleware that performs redirection on successful log in. 
Placement of this module is important. It requires a current user, so having a session is wise ;-)
@example
app.use protectResource.protectResourceRedirectMiddleware()

@param {object} opts additional protection options. Unused for now
*/


(function() {
  var protectResourceRedirectMiddleware;

  module.exports = protectResourceRedirectMiddleware = function(opts) {
    var fn;
    if (opts == null) {
      opts = {};
    }
    fn = function(req, res, cb) {
      var cookie;
      if (req.user) {
        cookie = req.cookies['post-login-page'];
        if (cookie) {
          res.cookie('post-login-page', null, {
            maxAge: 0,
            httpOnly: true
          });
          res.redirect(cookie);
          return;
        }
      }
      return cb();
    };
    return fn;
  };

}).call(this);

/*
//@ sourceMappingURL=protect-resource-redirect-middleware.js.map
*/